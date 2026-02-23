"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
}

interface CartItem extends Product {
  quantity: number;
}

const CATEGORIES = ["All", "Kids Cycle", "Ride-on Bike", "Battery Cars", "Soft Toys", "Educational Toys"];

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const homeRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  const scrollTo = (ref: React.RefObject<HTMLDivElement | null>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  useEffect(() => {
    setMounted(true);
    const initialProducts: Product[] = [
      { id: 'c1', name: 'Speedster Blue Cycle', price: 120, category: 'Kids Cycle', image: 'https://images.unsplash.com/photo-1517059224940-d4af9eec41b7?q=80&w=500&auto=format&fit=crop' },
      { id: 'b1', name: 'Police Ride-on Bike', price: 85, category: 'Ride-on Bike', image: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?q=80&w=500&auto=format&fit=crop' },
      { id: 'a1', name: 'Turbo Sport Car', price: 250, category: 'Battery Cars', image: 'https://images.unsplash.com/photo-1594787318286-3d835c1d207f?q=80&w=500&auto=format&fit=crop' },
      { id: 's1', name: 'Giant Plush Teddy', price: 25, category: 'Soft Toys', image: 'https://images.unsplash.com/photo-1559440666-37448d1217ac?q=80&w=500&auto=format&fit=crop' },
      { id: 'e1', name: 'STEM Builder Blocks', price: 45, category: 'Educational Toys', image: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?q=80&w=500&auto=format&fit=crop' }
    ];
    setProducts(initialProducts);
  }, []);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      return existing ? prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item) : [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-slate-50 text-gray-900 font-sans">
      
      {/* --- Optimized Responsive Navbar --- */}
      <nav className="sticky top-0 z-[60] bg-white/95 backdrop-blur-md border-b px-2 md:px-6 py-3 flex justify-between items-center shadow-sm">
        <div className="text-[16px] md:text-2xl font-black italic tracking-tighter text-blue-600 cursor-pointer shrink-0" onClick={() => scrollTo(homeRef)}>
          LITTLE<span className="text-orange-500">CHAMPS</span>
        </div>
        
        <div className="flex items-center gap-1 md:gap-4 ml-auto">
          <div className="flex font-black text-[7px] md:text-[11px] uppercase text-gray-600 border-r pr-1 mr-1">
            <button onClick={() => scrollTo(homeRef)} className="hover:text-blue-600 p-1">Home</button>
            <button onClick={() => scrollTo(aboutRef)} className="hover:text-blue-600 p-1">About</button>
            <button onClick={() => scrollTo(contactRef)} className="hover:text-blue-600 p-1">Contact</button>
          </div>

          <Link href="/admin" className="bg-blue-600 text-white font-black text-[7px] md:text-[10px] uppercase px-2 md:px-4 py-1.5 rounded-full hover:bg-black transition-all shadow-md shrink-0">
             Admin
          </Link>

          <button onClick={() => setIsCartOpen(true)} className="p-1.5 bg-gray-100 rounded-lg relative shrink-0">
            <span className="text-sm md:text-xl">🛒</span>
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-[7px] w-4 h-4 md:w-5 md:h-5 flex items-center justify-center rounded-full border border-white font-bold">
                {cart.reduce((a, b) => a + b.quantity, 0)}
              </span>
            )}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section ref={homeRef} className="relative h-[60vh] md:h-[85vh] flex items-center justify-center overflow-hidden bg-gray-900">
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1555626906-fcf10d6852b5?q=80&w=1200&auto=format&fit=crop" className="w-full h-full object-cover opacity-60 scale-105" alt="Hero" />
          <div className="absolute inset-0 bg-gradient-to-b from-blue-900/40 via-transparent to-gray-900"></div>
        </div>
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-9xl font-black italic uppercase leading-none text-white drop-shadow-2xl">
            PLAY <span className="text-orange-500">BIG</span>
          </h1>
          <button onClick={() => scrollTo(aboutRef)} className="mt-8 px-6 py-3 bg-orange-500 text-white font-black text-xs md:text-lg uppercase rounded-2xl shadow-xl hover:scale-110 transition-transform">Shop Now</button>
        </div>
      </section>

      {/* --- Products Grid --- */}
      <main className="max-w-7xl mx-auto px-4 py-12 md:py-20">
        <h2 className="text-3xl md:text-5xl font-black uppercase italic mb-12 text-center">Hamari Collection</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
          {products.map(product => (
            <div key={product.id} className="group bg-white p-5 rounded-[2.5rem] shadow-sm border border-gray-100 flex flex-col items-center">
              <div className="aspect-square w-full rounded-[2rem] overflow-hidden mb-4 bg-slate-50">
                <img src={product.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={product.name} />
              </div>
              <h3 className="font-black text-lg uppercase text-center">{product.name}</h3>
              <p className="text-2xl font-black text-blue-600 my-4">${product.price}</p>
              <button onClick={() => addToCart(product)} className="w-full bg-gray-900 text-white py-4 rounded-xl font-black hover:bg-orange-500 transition-all uppercase text-xs">Add to Cart</button>
            </div>
          ))}
        </div>
      </main>

      {/* --- Attractive About Section --- */}
      <section ref={aboutRef} className="py-24 bg-white px-6 overflow-hidden border-t">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="absolute -top-10 -left-10 w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-60"></div>
            <img 
              src="https://images.unsplash.com/photo-1556691421-cf15fe27a0b6?q=80&w=800&auto=format&fit=crop" 
              className="relative z-10 rounded-[3rem] shadow-2xl rotate-2 hover:rotate-0 transition-all duration-700"
              alt="Store"
            />
            <div className="absolute -bottom-6 -right-6 bg-orange-500 text-white p-6 rounded-[2rem] shadow-xl hidden md:block z-20">
              <p className="text-4xl font-black italic">#1</p>
              <p className="text-[10px] uppercase font-bold tracking-widest">Quality Store</p>
            </div>
          </div>
          <div className="space-y-6">
            <span className="bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest italic">Hamari Pehchan</span>
            <h2 className="text-5xl md:text-7xl font-black italic uppercase leading-none text-gray-900">Little Champs <span className="text-blue-600">Pakistan</span></h2>
            <p className="text-lg text-gray-600 font-medium italic leading-relaxed">"Bhowana ka sab se pur-aitamad toy store. Hum imported aur high-quality toys faraham karte hain taake aapke bachon ka bachpan mazeed rangeen ho jaye."</p>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-5 bg-slate-50 rounded-3xl border border-gray-100">
                <h4 className="text-2xl font-black text-blue-600">500+</h4>
                <p className="text-[10px] font-black text-gray-500 uppercase italic tracking-tighter">Products</p>
              </div>
              <div className="p-5 bg-slate-50 rounded-3xl border border-gray-100">
                <h4 className="text-2xl font-black text-orange-500">100%</h4>
                <p className="text-[10px] font-black text-gray-500 uppercase italic tracking-tighter">Safe Toys</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Modern Contact Section --- */}
      <section ref={contactRef} className="py-24 bg-blue-600 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-80 h-80 border-[40px] border-white rounded-full translate-x-1/2 -translate-y-1/2"></div>
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <h2 className="text-5xl md:text-8xl font-black italic uppercase text-white mb-16 text-center tracking-tighter">Hum Se <span className="text-orange-400">Rabta</span> Karein</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <a href="https://wa.me/9234194224" target="_blank" className="group bg-white/10 backdrop-blur-md border border-white/20 p-10 rounded-[3rem] hover:bg-white transition-all duration-500 text-center">
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">💬</div>
              <h3 className="text-white group-hover:text-gray-900 text-xl font-black uppercase italic">WhatsApp</h3>
              <p className="text-blue-100 group-hover:text-gray-600 font-bold">+92 341 94224</p>
            </a>
            <div className="group bg-white/10 backdrop-blur-md border border-white/20 p-10 rounded-[3rem] hover:bg-white transition-all duration-500 text-center">
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">📍</div>
              <h3 className="text-white group-hover:text-gray-900 text-xl font-black uppercase italic">Location</h3>
              <p className="text-blue-100 group-hover:text-gray-600 font-bold italic text-sm">Main Bazaar, Bhowana, Pakistan</p>
            </div>
            <div className="group bg-white/10 backdrop-blur-md border border-white/20 p-10 rounded-[3rem] hover:bg-white transition-all duration-500 text-center">
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">🚚</div>
              <h3 className="text-white group-hover:text-gray-900 text-xl font-black uppercase italic">Delivery</h3>
              <p className="text-blue-100 group-hover:text-gray-600 font-bold italic text-sm">Fast Home Delivery Services</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-6 text-center border-t border-gray-800">
          <p className="text-gray-500 text-[10px] uppercase tracking-[0.4em] mb-2">Designed & Developed By</p>
          <p className="text-3xl font-black italic text-orange-500 tracking-tighter">ALI HASNAIN</p>
          <p className="text-gray-600 text-[10px] mt-6 italic">© 2024 LITTLE CHAMPS. All Rights Reserved.</p>
      </footer>

      {/* Cart Sidebar */}
      {isCartOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsCartOpen(false)}></div>
          <div className="relative w-full max-w-[280px] bg-white h-full p-6 flex flex-col shadow-2xl transition-all">
            <h2 className="text-2xl font-black italic uppercase mb-10 border-b pb-4 text-blue-600">Your Bag</h2>
            <div className="flex-1 overflow-y-auto pr-2">
              {cart.length === 0 ? <p className="text-gray-400 font-bold italic text-center py-20">Cart is Empty!</p> : cart.map(item => (
                <div key={item.id} className="flex gap-4 items-center mb-6 bg-gray-50 p-4 rounded-xl border border-gray-100 shadow-sm">
                  <img src={item.image} className="w-12 h-12 object-cover rounded-lg" alt={item.name} />
                  <div className="flex-1 text-[10px]">
                    <h4 className="font-black uppercase text-gray-800 leading-tight">{item.name}</h4>
                    <p className="font-black text-blue-600 mt-1">${item.price}</p>
                    <p className="text-gray-400 font-bold italic">Qty: {item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>
            {cart.length > 0 && (
              <button className="w-full bg-blue-600 text-white py-4 rounded-xl font-black mt-4 uppercase text-xs hover:bg-orange-500 shadow-lg shadow-blue-200">Checkout Now</button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}