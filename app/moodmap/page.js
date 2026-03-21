'use client'
import { useState } from 'react'   // only takes what is needed for this code to work

export default function Home() {
  const [selectedEmoji, setSelectedEmoji] = useState('')  // state to keep track of the selected emoji
  const [selectedEnvironment, setSelectedEnvironment] = useState('')  // state to keep track of the selected environment
  const [message, setMessage] = useState('')  // state to keep track of the message to display
  const [submitted, setSubmitted] = useState(false)  // state to keep track of whether the form has been submitted

  const emojis = [  // a stroage of the emojis and their labels
    {icon: '😀', label: 'Hopeful'},
    {icon: '😢', label: 'Sad'},
    {icon: '😡', label: 'Angry'},
    {icon: '😨', label: 'Worried'},
    {icon: '😴', label: 'Drained'},
  ]

  const environments = [  // a storage of the environments and their labels
    {icon: '🏭', label: 'Air Pollution'},
    {icon: '🗑️', label: 'Litter'},
    {icon: '🌳', label: 'Deforestation'},
    {icon: '🌊', label: 'Flooding'},
    {icon: '✅', label: 'Clean and Green'},
  ]

  const handleSubmit = async () => {
    if (!selectedEmoji || !selectedEnvironment) return 

    try {
        const response = await fetch('/api/moods', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                emoji: selectedEmoji, 
                environment: selectedEnvironment,
                message: message, 
                latitude: 40.7128,
                longitude: -74.0060
             })  // send the selected emoji and message to the server
        })
        const data = await response.json()  // wait for the response from the server
      if (data.success) {
        setSubmitted(true)  // set the submitted state to true to show the success message
      }
    } catch (error) {
        console.error('Error submitting mood:', error)  // log any errors that occur during submission
    }       
 }


  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4"> {/* Makes a screen the fit the whole screen with a black background and white text */}

    {/* Header */}
    <h1 className="text-5xl font-bold mb-2 text-green-400">EcoMood</h1> {/* Title of the app with styling */}



    {/* A section for the user to select an environment that represents their current surroundings */}
    <p className = "text-green-300 mb-4 text-lg">What is your Environment like right now?</p> {/* A prompt for the user with styling */}
    <div className = "flex gap-4 mb-8">
      {environments.map((e) => (
        <button
          key={e.icon}
          onClick = {() => setSelectedEnvironment(e.icon)}
          className = {`text-5xl p-4 rounded-full transition-all duration-200 ${
            selectedEnvironment === e.icon
            ? 'bg-green-600 scale-125'
            : 'bg-blue-900 hover:bg-blue-800 '
          }`}
        >
          {e.icon}
        </button>
      ))}
    </div>

    {/* A section for the user to select an emoji that represents their mood */}
    <p className = "text-blue-300 mb-4 text-md">How does it make you feel?</p> {/* A prompt for the user with styling */}
    <div className="flex gap-4 mb-8">
      {emojis.map((e) => (  // loop through the emojis and create a button for each one)
        <button
          key={e.icon}
          onClick={() => setSelectedEmoji(e.icon)}
          className={`text-5xl p-4 rounded-full transition-all duration-200 ${
            selectedEmoji === e.icon 
            ? 'bg-green-600 scale-125' 
            : 'bg-blue-900 hover:bg-blue-800 '}`}
          
        >
          {e.icon}
        </button>
      ))}
    </div>
    
    {/* A text area for the user to enter a message about their mood */}
    <textarea 
      placeholder="Describe what you see around you... (max 200 chars)"
      maxLength={140}
      value={message}
      onChange={(e) => setMessage(e.target.value)}
      className="w-full max-w-md bg-blue-900 text-white rounded-xl p-4 mb-2 resize-none outline-none focus:ring-2 focus:ring-green-500" /* Styling for the text area */
      rows={3}
    />

    {/* a message counter to let the user know how many characters till the limit */}
    <p className = "text-blue-300 text-sm mb-6 self-end max-w-md">
      {message.length}/200
    </p>
    
    <button 
      onClick={handleSubmit}
      disabled={!selectedEmoji || !selectedEnvironment}  // disable the button if no emoji or environment is selected
      className = {`px-10 py-4 rounded-full text-lg font-bold transition-all duration-200 ${
        selectedEmoji 
        ? 'bg-green-600 hover:bg-green-500 cursor-pointer'
        : 'bg-blue-900 cursor-not-allowed opacity-50'
      }`}
    >
      Share My Mood
    </button>

    {submitted && (
    <div className = "flex flex-col items-center gap-4 mt-6">
      <p className = "text-green-400 text-lg font-medium">
        Your environmental report was submitted! 🌿 Check the EcoReport to see community data. 
      </p>

     <a 
      href="/resultspage"
      className = "px-6 py-3 bg-blue-900 hover:bg-blue-800 rounded-full text-blue-300 text-sm font-medium transition-all"
      >
        View Community Reports 
      </a>

    </div>
      )}
      
      

      


  </main>
  )
}