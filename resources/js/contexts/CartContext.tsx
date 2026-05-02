import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
} from 'react';
import { toast } from 'react-hot-toast';
import { AlertCircle, CloudAlertIcon, ShoppingCart } from 'lucide-react';

export interface CartItem {
    id: number | string;
    name: string;
    price: number;
    image?: string;
     main_image?: string;
    slug: string;
    brand?: string;
    cartQuantity: number;
    stock: number;
}

interface CartContextType {
    cartItems: CartItem[];
    addToCart: (product: any, quantity?: number) => boolean;
    removeFromCart: (productId: number | string) => void;
    updateQuantity: (productId: number | string, quantity: number) => void;
    getItemQuantity: (productId: number | string) => number;
    clearCart: () => void;
    cartTotal: number;
    cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>(() => {
        if (typeof window !== 'undefined') {
            const savedCart = localStorage.getItem('axelmason_cart');
            if (savedCart) return JSON.parse(savedCart);
        }
        return[];
    });

    useEffect(() => {
        localStorage.setItem('axelmason_cart', JSON.stringify(cartItems));
    }, [cartItems]);

    const getItemQuantity = (productId: number | string) => {
        const item = cartItems.find((i) => i.id === productId);
        return item ? item.cartQuantity : 0;
    };

    const addToCart = (product: any, quantity: number = 1): boolean => {
        const availableStock = product.stock_quantity ?? product.quantity ?? 99; // Defaulted to 99 if undefined

        const existingItem = cartItems.find((item) => item.id === product.id);
        const currentCartQuantity = existingItem ? existingItem.cartQuantity : 0;
        const newTotalQuantity = currentCartQuantity + quantity;

        if (newTotalQuantity > availableStock) {
            toast.error(
                `Only ${availableStock} ${product.name}(s) available in stock.`,
                {
                    icon: <AlertCircle className="h-6 w-6 text-red-500" />,
                }
            );
            return false;
        }

        toast.success(`${product.name} added to cart`, {
            icon: <ShoppingCart className="h-6 w-6 text-orange-500" />,
        });

        setCartItems((prevItems) => {
            const itemExists = prevItems.find((item) => item.id === product.id);

            if (itemExists) {
                return prevItems.map((item) =>
                    item.id === product.id
                        ? { ...item, cartQuantity: item.cartQuantity + quantity }
                        : item,
                );
            }

            return[
                ...prevItems,
                {
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    image: product.image || product.main_image,
                    slug: product.slug,
                    brand: product.brand,
                    cartQuantity: quantity,
                    stock: availableStock,
                },
            ];
        });

        return true;
    };

    const removeFromCart = (productId: number | string) => {
        setCartItems((prevItems) =>
            prevItems.filter((item) => item.id !== productId),
        );
    };

    const updateQuantity = (productId: number | string, quantity: number) => {
        if (quantity < 1) {
            removeFromCart(productId);
            return;
        }

        const itemToUpdate = cartItems.find((item) => item.id === productId);
        if (itemToUpdate && quantity > itemToUpdate.stock) {
            toast.error(
                `Cannot add more. Only ${itemToUpdate.stock} available.`,
                {
                    icon: <CloudAlertIcon className="h-5 w-5 text-red-500" />,
                }
            );
            return;
        }

        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.id === productId ? { ...item, cartQuantity: quantity } : item,
            ),
        );
    };

    const clearCart = () => setCartItems([]);

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
                getItemQuantity,
                clearCart,
                cartTotal,
                cartCount,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
