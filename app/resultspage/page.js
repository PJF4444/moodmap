'use client'
import { supabase } from '@/lib/supabaseClient'
import dynamic from 'next/dynamic'
import { useState, useEffect } from 'react'
import '../globals.css'

// Import the map without breaking the build
const MoodMap = dynamic(() => import('../../components/MoodMap'), { 
  ssr: false, 
  loading: () => <div className="h-[300px] w-full bg-gray-900 animate-pulse rounded-3xl" />
})

export default function EcoReportPage() {
  const [selectedEmoji, setSelectedEmoji] = useState('')
  const [message, setMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [vibeReport, setVibeReport] = useState("")
  const [allMoods, setAllMoods] = useState([])

  // ECO-EMOJI LIST (Repurposed from your mood list)
  const emojis = [
    {icon: '🌿', label: 'Healthy'},
    {icon: '🏭', label: 'Polluted'},
    {icon: '🗑️', label: 'Littered'},
    {icon: '☀️', label: 'Clear'},
    {icon: '😨', label: 'Worried'},
  ]

  // 1. ADD THIS FETCH LOGIC (The "Ear" that listens to the DB)
useEffect(() => {
  const fetchReports = async () => {
    // We fetch from 'moods' since that's your table name
    const { data, error } = await supabase
      .from('moods')
      .select('*')
      .order('created_at', { ascending: false }); // Latest reports first

    if (error) {
      console.error("Error fetching map data:", error);
    } else {
      setAllMoods(data || []);
    }
  };

  fetchReports();
  
  // Set up a "Real-time" listener so the map updates without refreshing!
  const channel = supabase
    .channel('schema-db-changes')
    .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'moods' }, 
      (payload) => {
        setAllMoods((prev) => [payload.new, ...prev]);
      }
    )
    .subscribe();

  return () => supabase.removeChannel(channel);
}, [submitted]); // Refetch whenever a new report is submitted

// 2. THE CLEAN SUBMIT LOGIC
const handleSubmit = async () => {
  if (!selectedEmoji) return;

  // These coordinates put pins roughly around a specific "City" area for the demo
  const lat = 34.0522 + (Math.random() - 0.5) * 2; 
  const lng = -118.2437 + (Math.random() - 0.5) * 2;

  const { error } = await supabase
    .from('moods')
    .insert([{ 
      emoji: selectedEmoji, 
      message: message, 
      latitude: lat, 
      longitude: lng,
      environment: emojis.find(e => e.icon === selectedEmoji)?.label || "General"
    }]);

  if (!error) {
    setSubmitted(true);
    setMessage('');
    setSelectedEmoji('');
    // Give them a "Success" moment
    setTimeout(() => setSubmitted(false), 3000);
  } else {
    alert("Database connection issue. Check your .env keys!");
  }
};

  const getVibe = async () => {
    setVibeReport("Analyzing environmental sentiment...")
    await new Promise(resolve => setTimeout(resolve, 1000));
    if (allMoods.length === 0) return setVibeReport("No data yet.");

    const summaries = {
      '🌿': "Nature is thriving! The community feels a strong connection to green spaces. ✨",
      '🏭': "Industrial concerns are rising. The AI suggests monitoring air quality today. ⚠️",
      '🗑️': "Litter alerts! Time for a community cleanup initiative. 🧹",
      '☀️': "Crystal clear vibes. Energy efficiency is at a local high. ⚡",
      '😨': "Environmental anxiety is peaking. Let's focus on small sustainable wins. 💚"
    };

    const counts = {};
    allMoods.forEach(m => counts[m.emoji] = (counts[m.emoji] || 0) + 1);
    const topEmoji = Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b);
    setVibeReport(summaries[topEmoji] || "The environment is in a state of transition.");
  };

  return (
    <main className="min-h-screen bg-black text-white p-6 flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-2 text-green-400">EcoMood Reporter</h1>
      <p className="text-gray-400 mb-8">Anonymous Environmental Intelligence</p>

      {/* EMOJI SELECTOR */}
      <div className="flex gap-3 mb-6">
        {emojis.map((e) => (
          <button
            key={e.icon}
            onClick={() => setSelectedEmoji(e.icon)}
            className={`p-4 rounded-2xl transition-all ${selectedEmoji === e.icon ? 'bg-green-600 scale-110' : 'bg-gray-900 hover:bg-gray-800'}`}
          >
            <span className="text-3xl">{e.icon}</span>
            <p className="text-[10px] mt-1 uppercase font-bold text-gray-400">{e.label}</p>
          </button>
        ))}
      </div>

      <textarea 
        placeholder="What's happening in your environment?"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="w-full max-w-md bg-gray-900 rounded-2xl p-4 mb-4 outline-none focus:ring-2 focus:ring-green-500"
        rows={3}
      />

      <button onClick={handleSubmit} className="bg-green-600 px-8 py-3 rounded-full font-bold mb-10">
        {submitted ? "Report Pinned! 📍" : "Submit Report"}
      </button>

      {/* THE MAP */}
      <div className="w-full max-w-4xl h-[400px] rounded-3xl overflow-hidden border border-gray-800 mb-8">
        <MoodMap moods={allMoods} />
      </div>

      {/* STATS */}
      <div className="w-full max-w-md bg-gray-900/50 p-6 rounded-3xl border border-gray-800">
        <button onClick={getVibe} className="text-green-400 text-xs font-bold tracking-widest uppercase mb-4 w-full">
          Generate AI Eco-Insight ✨
        </button>
        <p className="text-center italic text-gray-300">{vibeReport}</p>
      </div>
    </main>
  )
}