'use client'
import { useState } from 'react'   // only takes what is needed for this code to work

export default function Home() {
  const [selectedEmoji, setSelectedEmoji] = useState('')  // state to keep track of the selected option
  const [message, setMessage] = useState('')  // state to keep track of the message to display
  const [submitted, setSubmitted] = useState(false)  // state to keep track of whether the form has been submitted

  const emojis = [  // a stroage of the emojis and their labels
    {icon: '😀', label: 'Happy'},
    {icon: '😢', label: 'Sad'},
    {icon: '😡', label: 'Angry'},
    {icon: '😍', label: 'Loved'},
    {icon: '😴', label: 'Tired'},
  ]

  const handleSubmit = async () => {
    if (!selectedEmoji) return 
    console.log('Submitting: ', selectedEmoji,message)  // log the selected emoji and message for debugging
    setSubmitted(true)  // set submitted to true to show the message
  }

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4"> {/* Makes a screen the fit the whole screen with a black background and white text */}

    {/* Header */}
    <h1 className="text-5x1 font-bold mb-2 text-purple-400">MoodMap</h1> {/* Title of the app with styling */}

    {/* Subheader */}
    <p className="text-gray-400 mb-10 text-lg">How are you feeling today?</p> {/* A prompt for the user with styling */}

    <div className="flex gap-4 mb-8">
      {emojis.map((e) => (  // loop through the emojis and create a button for each one)
        <button
          key={e.icon}
          onClick={() => setSelectedEmoji(e.icon)}
          className={`text-5x1 p-4 rounded-full transition-all duration-200 ${
            selectedEmoji === e.icon 
            ? 'bg-purple-600 scale-125' 
            : 'bg-gray-800 hover:bg-gray-700 '}`}
          
        >
          {e.icon}
        </button>
      ))}
    </div>
    
    {/* A text area for the user to enter a message about their mood */}
    <textarea 
      placeholder="Say something about your mood...(max 200 chars)"
      maxLength={140}
      value={message}
      onChange={(e) => setMessage(e.target.value)}
      className="w-full max-w-md bg-gray-800 text-white rounded-x1 p-4 mb-2 resize-none outline-none focus:ring-2 foucus:ring-purple-500" /* Styling for the text area */
      rows={3}
    />
           

      


  </main>
  )
}