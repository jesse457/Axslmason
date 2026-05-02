<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" class="{{ ($appearance ?? 'system') === 'dark' ? 'dark' : '' }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        {{-- Browser Tab Title & SEO (managed by Inertia) --}}
        <title data-inertia="title">{{ $page['props']['seo']['title'] ?? config('app.name', 'AXELMASON') }}</title>
        <meta name="description" data-inertia="description" content="{{ $page['props']['seo']['description'] ?? 'Global supplier of certified industrial & medical-grade hardware.' }}">

        {{-- Browser Tab Icon (Favicon) --}}
        <link rel="icon" type="image/png" href="{{ asset('assets/axel.png') }}">
        <link rel="apple-touch-icon" href="{{ asset('assets/axel.png') }}">

        {{-- Fonts & Performance --}}
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />

        {{-- Scripts & Inertia --}}
        @routes
        @viteReactRefresh
        @vite(['resources/css/app.css', 'resources/js/app.tsx', "resources/js/Pages/{$page['component']}.tsx"])

        {{-- Inertia Head for dynamic updates --}}
        <x-inertia::head />

        {{-- Simple Dark Mode Support (No logo scaling) --}}
        <style>
            html.dark { color-scheme: dark; }
        </style>

        {{-- Anti-Flicker Script --}}
        <script>
            (function() {
                try {
                    const theme = localStorage.getItem('theme') || 'system';
                    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                    if (theme === 'dark' || (theme === 'system' && prefersDark)) {
                        document.documentElement.classList.add('dark');
                    }
                } catch(e) {}
            })();
        </script>
    </head>

    <body class="font-sans antialiased bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100">
        {{-- Skip Link for Accessibility --}}
        <a href="#main-content" class="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-orange-600 focus:text-white focus:rounded-lg">
            Skip to main content
        </a>

        <x-inertia::app id="main-content" />
    </body>
</html>
