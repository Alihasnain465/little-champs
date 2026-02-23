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
  const [selectedCategory, setSelectedCategory] = useState("All");
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

  const filteredProducts = selectedCategory === "All" ? products : products.filter(p => p.category === selectedCategory);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-slate-50 text-gray-900 font-sans">
      
      {/* Navbar */}
      <nav className="sticky top-0 z-[60] bg-white/80 backdrop-blur-xl border-b px-6 py-4 flex justify-between items-center shadow-sm">
        <div className="text-3xl font-black italic tracking-tighter text-blue-600 cursor-pointer" onClick={() => scrollTo(homeRef)}>
          LITTLE<span className="text-orange-500">CHAMPS</span>
        </div>
        
        <div className="hidden md:flex space-x-8 font-black text-[11px] uppercase tracking-widest text-gray-600 items-center">
          <button onClick={() => scrollTo(homeRef)} className="hover:text-blue-600 transition-all border-b-2 border-transparent hover:border-blue-600">Home</button>
          <button onClick={() => scrollTo(aboutRef)} className="hover:text-blue-600 transition-all border-b-2 border-transparent hover:border-blue-600">About</button>
          <button onClick={() => scrollTo(contactRef)} className="hover:text-blue-600 transition-all border-b-2 border-transparent hover:border-blue-600">Contact</button>
          <Link href="/admin" className="text-white bg-blue-600 px-6 py-2 rounded-full hover:bg-orange-500 transition-all shadow-lg">
            🔐 Admin Login
          </Link>
        </div>

        <button onClick={() => setIsCartOpen(true)} className="p-3 bg-white border border-gray-100 rounded-2xl relative shadow-sm hover:shadow-md transition-all">
          <span className="text-2xl">🛒</span>
          {cart.length > 0 && <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-[10px] w-6 h-6 flex items-center justify-center rounded-full border-4 border-white font-bold">{cart.reduce((a, b) => a + b.quantity, 0)}</span>}
        </button>
      </nav>

      {/* Hero Section */}
      <section ref={homeRef} className="relative h-[85vh] flex items-center justify-center overflow-hidden bg-gray-900">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1555626906-fcf10d6852b5?q=80&w=1200&auto=format&fit=crop" 
            className="w-full h-full object-cover opacity-60 scale-105"
            alt="Hero Background" 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-blue-900/40 via-transparent to-gray-900"></div>
        </div>

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <div className="inline-block mb-6 px-4 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white text-xs font-black uppercase tracking-[0.3em] animate-pulse">
            ✨ Bhowana's Biggest Toy Hub
          </div>
          <h1 className="text-7xl md:text-9xl font-black italic uppercase leading-none text-white drop-shadow-2xl">
            PLAY <span className="text-orange-500">BIG</span> <br/>
            DREAM <span className="text-blue-500">BIG</span>
          </h1>
          <p className="mt-8 text-xl md:text-3xl font-bold text-gray-200 italic max-w-3xl mx-auto leading-relaxed">
            "Bachon ki pasand, walidain ka aitamad. <br/> 
            Ab har khilona, aapki pohanch mein."
          </p>
          <button onClick={() => scrollTo(aboutRef)} className="mt-10 px-10 py-5 bg-orange-500 hover:bg-white hover:text-orange-600 text-white font-black text-lg uppercase tracking-widest rounded-3xl transition-all shadow-2xl hover:scale-105">
            Explore Collection
          </button>
        </div>
      </section>

      {/* Categories & Products */}
      <main className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex flex-col items-center mb-16">
          <h2 className="text-4xl font-black uppercase italic mb-6">Hamari Collection</h2>
          <div className="flex flex-wrap gap-3 justify-center">
            {CATEGORIES.map(cat => (
              <button key={cat} onClick={() => setSelectedCategory(cat)} 
                className={`px-8 py-3 rounded-full font-black text-[10px] uppercase tracking-widest transition-all border-2 ${selectedCategory === cat ? 'bg-blue-600 text-white border-blue-600 shadow-lg' : 'bg-white text-gray-400 border-gray-100 hover:border-blue-300'}`}>
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredProducts.map(product => (
            <div key={product.id} className="group bg-white p-5 rounded-[3rem] shadow-sm hover:shadow-2xl transition-all border border-gray-100 flex flex-col items-center">
              <div className="aspect-square w-full rounded-[2.5rem] overflow-hidden mb-6 bg-slate-50 border border-gray-50">
                <img src={product.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={product.name} />
              </div>
              <h3 className="font-black text-xl uppercase text-center h-14">{product.name}</h3>
              <p className="text-3xl font-black text-blue-600 mb-6">${product.price}</p>
              <button onClick={() => addToCart(product)} className="w-full bg-gray-900 text-white py-4 rounded-2xl font-black hover:bg-orange-500 transition-all shadow-md uppercase tracking-tighter">Add to Cart</button>
            </div>
          ))}
        </div>
      </main>

      {/* About Section */}
      <section ref={aboutRef} className="py-24 bg-white px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-6xl font-black italic uppercase mb-6 text-blue-600">Little Champs <span className="text-orange-500">Pakistan</span></h2>
          <p className="text-2xl leading-relaxed text-gray-600 font-bold italic">
            "Bhowana ka sab se pur-aitamad aur behtareen toy store. Hum sirf khilone nahi bechte, hum bachon ki bachpan ko rangeen banate hain."
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section ref={contactRef} className="py-24 bg-blue-600 px-6 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-7xl font-black italic mb-8 uppercase leading-none">Rabta Karein</h2>
          <p className="text-2xl font-black text-blue-100 mb-10 italic">Call Us: +92 341 94224</p>
          <div className="bg-white p-12 rounded-[4rem] text-gray-900 shadow-2xl">
              <input type="text" placeholder="Apka Naam" className="w-full bg-gray-50 border-none p-5 rounded-2xl font-bold mb-4" />
              <button className="w-full bg-orange-500 text-white py-6 rounded-3xl font-black text-lg hover:bg-black transition-all shadow-xl">Send Message</button>
          </div>
        </div>
      </section>

      {/* Cart Sidebar */}
      {isCartOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsCartOpen(false)}></div>
          <div className="relative w-full max-w-md bg-white h-full p-10 flex flex-col shadow-2xl">
            <h2 className="text-4xl font-black italic uppercase mb-10">Your Bag</h2>
            <div className="flex-1 overflow-y-auto">
              {cart.map(item => (
                <div key={item.id} className="flex gap-5 items-center mb-8 bg-gray-50 p-5 rounded-[2rem]">
                  <img src={item.image} className="w-24 h-24 object-cover rounded-3xl" alt={item.name} />
                  <div className="flex-1">
                    <h4 className="font-black text-sm uppercase">{item.name}</h4>
                    <p className="text-xl font-black text-blue-600">${item.price}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full bg-blue-600 text-white py-6 rounded-3xl font-black text-xl mt-4">Checkout</button>
          </div>
        </div>
      )}
    </div>
  );
}