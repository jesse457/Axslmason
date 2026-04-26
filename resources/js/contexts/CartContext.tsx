import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
} from 'react';
import { toast } from 'react-hot-toast'; // Ensure this is installed
import { ShoppingCart } from 'lucide-react';

// Define the shape of a cart item (extends your base Product)
export interface CartItem {
    id: number | string;
    name: string;
    price: number;
    image?: string;
    slug: string;
    brand?: string;
    cartQuantity: number;
}

// Define the Context shape
interface CartContextType {
    cartItems: CartItem[];
    addToCart: (product: any, quantity?: number) => void;
    removeFromCart: (productId: number | string) => void;
    updateQuantity: (productId: number | string, quantity: number) => void;
    clearCart: () => void;
    cartTotal: number;
    cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    // Initialize cart from localStorage if it exists
    const [cartItems, setCartItems] = useState<CartItem[]>(() => {
        if (typeof window !== 'undefined') {
            const savedCart = localStorage.getItem('augimen_cart');
            if (savedCart) return JSON.parse(savedCart);
        }
        return [];
    });

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('augimen_cart', JSON.stringify(cartItems));
    }, [cartItems]);

    // Add item to cart
    const addToCart = (product: any, quantity: number = 1) => {
        setCartItems((prevItems) => {
            const existingItem = prevItems.find(
                (item) => item.id === product.id,
            );
            toast.success(`${product.name} added to cart`, {
                icon: <ShoppingCart className="h-5 w-5 text-orange-500" />,
                style: {
                    borderRadius: '8px',
                    background: '#ffffff',
                    color: '#1e293b',
                    border: '1px solid #e2e8f0',
                },
            });
            if (existingItem) {
                // If item exists, increase quantity
                return prevItems.map((item) =>
                    item.id === product.id
                        ? {
                              ...item,
                              cartQuantity: item.cartQuantity + quantity,
                          }
                        : item,
                );
            }

            // If new item, add to cart
            return [
                ...prevItems,
                {
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    image: product.image,
                    slug: product.slug,
                    brand: product.brand,
                    cartQuantity: quantity,
                },
            ];
        });
    };

    // Remove item completely
    const removeFromCart = (productId: number | string) => {
        setCartItems((prevItems) =>
            prevItems.filter((item) => item.id !== productId),
        );
    };

    // Update specific quantity (e.g., from a cart page input)
    const updateQuantity = (productId: number | string, quantity: number) => {
        if (quantity < 1) {
            removeFromCart(productId);
            return;
        }
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.id === productId
                    ? { ...item, cartQuantity: quantity }
                    : item,
            ),
        );
    };

    // Clear entire cart
    const clearCart = () => setCartItems([]);

    // Derived state for totals
    const cartTotal = cartItems.reduce(
        (total, item) => total + item.price * item.cartQuantity,
        0,
    );
    const cartCount = cartItems.reduce(
        (count, item) => count + item.cartQuantity,
        0,
    );

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                cartTotal,
                cartCount,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

// Custom hook to use the cart easily in any component
export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
