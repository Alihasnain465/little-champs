"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

// Types define karein
interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
}

const CATEGORIES = ["Kids Cycle", "Ride-on Bike", "Battery Cars", "Soft Toys", "Educational Toys", "Indoor Games", "Shoes"];

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [mounted, setMounted] = useState(false);
  
  // Form & Search States
  const [newName, setNewName] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newCategory, setNewCategory] = useState("Kids Cycle");
  const [newImage, setNewImage] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('lc_products');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setProducts(Array.isArray(parsed) ? parsed : []);
      } catch (e) {
        setProducts([]);
      }
    }
  }, []);

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (username === "admin" && password === "admin123") {
      setIsLoggedIn(true);
    } else {
      window.alert("❌ Galat Username ya Password!");
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newName || !newPrice) return;

    if (editingId) {
      const updatedProducts = products.map(p => 
        p.id === editingId 
          ? { ...p, name: newName, price: Number(newPrice), category: newCategory, image: newImage || p.image } 
          : p
      );
      setProducts(updatedProducts);
      localStorage.setItem('lc_products', JSON.stringify(updatedProducts));
      setEditingId(null);
      window.alert("✅ Product Update Ho Gaya!");
    } else {
      const newProd: Product = {
        id: Date.now().toString(),
        name: newName,
        price: Number(newPrice),
        category: newCategory,
        image: newImage || `https://images.unsplash.com/photo-1515488764276-beab7607c1e6?w=500&q=80`
      };
      const updated = [...products, newProd];
      setProducts(updated);
      localStorage.setItem('lc_products', JSON.stringify(updated));
      window.alert("🚀 Product Add Ho Gaya!");
    }

    setNewName(""); setNewPrice(""); setNewImage("");
  };

  const startEdit = (product: Product) => {
    setEditingId(product.id);
    setNewName(product.name);
    setNewPrice(product.price.toString());
    setNewCategory(product.category);
    setNewImage(product.image);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const deleteProduct = (id: string) => {
    if (window.confirm("Kya aap ise delete karna chahte hain?")) {
      const updated = products.filter(p => p.id !== id);
      setProducts(updated);
      localStorage.setItem('lc_products', JSON.stringify(updated));
    }
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Statistics Calculation
  const totalValue = products.reduce((acc, curr) => acc + curr.price, 0);

  if (!mounted) return null;

  // --- LOGIN VIEW ---
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-700 via-purple-600 to-pink-500 flex items-center justify-center p-6 text-gray-800">
        <div className="bg-white/20 backdrop-blur-xl p-1 w-full max-w-md rounded-3xl shadow-2xl">
          <form onSubmit={handleLogin} className="bg-white p-10 rounded-[1.4rem]">
            <div className="text-center mb-8">
              <span className="text-5xl block mb-4">🔐</span>
              <h2 className="text-3xl font-black">Admin Login</h2>
            </div>
            <div className="space-y-4">
              <input type="text" placeholder="Username" required className="w-full px-5 py-4 rounded-2xl border bg-gray-50 outline-none focus:ring-2 focus:ring-blue-500" value={username} onChange={(e) => setUsername(e.target.value)} />
              <input type="password" placeholder="Password" required className="w-full px-5 py-4 rounded-2xl border bg-gray-50 outline-none focus:ring-2 focus:ring-blue-500" value={password} onChange={(e) => setPassword(e.target.value)} />
              <button type="submit" className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold hover:bg-blue-700 shadow-lg transition">Login Karein</button>
            </div>
            <Link href="/" className="block mt-6 text-center text-blue-600 font-bold hover:underline">🏠 Wapas Home Jayein</Link>
          </form>
        </div>
      </div>
    );
  }

  // --- ADMIN DASHBOARD VIEW ---
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <nav className="bg-white border-b sticky top-0 z-50 px-8 py-5 flex justify-between items-center shadow-sm">
        <h1 className="text-2xl font-black text-blue-600 tracking-tight">Little Champs Admin</h1>
        <div className="flex gap-4">
          <Link href="/" className="px-4 py-2 bg-gray-100 rounded-xl font-bold hover:bg-blue-600 hover:text-white transition">🏠 Store</Link>
          <button onClick={() => setIsLoggedIn(false)} className="bg-red-50 text-red-600 px-4 py-2 rounded-xl font-bold hover:bg-red-600 hover:text-white transition">Logout</button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto p-6 lg:p-10 grid lg:grid-cols-12 gap-10">
        
        {/* Left Column: Form & Stats */}
        <div className="lg:col-span-4 space-y-6">
          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
              <p className="text-xs text-gray-400 font-bold uppercase">Total Items</p>
              <p className="text-2xl font-black text-gray-800">{products.length}</p>
            </div>
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
              <p className="text-xs text-gray-400 font-bold uppercase">Value</p>
              <p className="text-2xl font-black text-blue-600">${totalValue}</p>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white p-8 rounded-[2rem] shadow-xl border border-gray-100 sticky top-28">
            <h3 className="text-xl font-black mb-6">{editingId ? "📝 Edit Product" : "✨ Naya Product"}</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input required placeholder="Khilone ka naam" className="w-full px-4 py-3 rounded-xl border bg-gray-50 outline-none focus:ring-2 focus:ring-blue-500" value={newName} onChange={(e) => setNewName(e.target.value)} />
              <input required type="number" placeholder="Price ($)" className="w-full px-4 py-3 rounded-xl border bg-gray-50 outline-none focus:ring-2 focus:ring-blue-500" value={newPrice} onChange={(e) => setNewPrice(e.target.value)} />
              <select className="w-full px-4 py-3 rounded-xl border bg-gray-50 outline-none" value={newCategory} onChange={(e) => setNewCategory(e.target.value)}>
                {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
              <input placeholder="Image URL (Option)" className="w-full px-4 py-3 rounded-xl border bg-gray-50 outline-none" value={newImage} onChange={(e) => setNewImage(e.target.value)} />
              <button type="submit" className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold hover:shadow-lg transition">
                {editingId ? "Update Product" : "Add Product"}
              </button>
              {editingId && (
                <button type="button" onClick={() => {setEditingId(null); setNewName(""); setNewPrice("");}} className="w-full text-gray-500 font-semibold mt-2">Cancel Edit</button>
              )}
            </form>
          </div>
        </div>

        {/* Right Column: Inventory List */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white p-4 rounded-2xl shadow-sm border">
            <input type="text" placeholder="🔍 Search products by name..." className="w-full px-4 py-2 outline-none" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          </div>

          <div className="bg-white rounded-[2rem] shadow-xl border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50 border-b text-gray-400 text-xs font-bold uppercase">
                  <tr>
                    <th className="px-8 py-4">Item</th>
                    <th className="px-8 py-4">Category</th>
                    <th className="px-8 py-4">Price</th>
                    <th className="px-8 py-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {filteredProducts.map((p) => (
                    <tr key={p.id} className="hover:bg-blue-50/30 transition">
                      <td className="px-8 py-4 flex items-center gap-4">
                        <img src={p.image} alt={p.name} className="w-12 h-12 rounded-lg object-cover bg-gray-100" />
                        <span className="font-bold">{p.name}</span>
                      </td>
                      <td className="px-8 py-4 text-sm text-gray-500">{p.category}</td>
                      <td className="px-8 py-4 font-black text-blue-600">${p.price}</td>
                      <td className="px-8 py-4 space-x-4">
                        <button onClick={() => startEdit(p)} className="text-blue-500 font-bold hover:underline">Edit</button>
                        <button onClick={() => deleteProduct(p.id)} className="text-red-400 font-bold hover:underline">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredProducts.length === 0 && (
                <div className="p-20 text-center text-gray-400 font-medium">Koi products nahi mile!</div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}