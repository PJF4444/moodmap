'use client'
import { useState } from 'react'   // only takes what is needed for this code to work

import './styles.css';
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


  const emojis2 = [  // Like above, but with unique id numbers for each.
    {icon: '😀', label: 'Happy', id: 0},
    {icon: '😢', label: 'Sad', id: 1},
    {icon: '😡', label: 'Angry', id: 2},
    {icon: '😍', label: 'Loved', id: 3},
    {icon: '😴', label: 'Tired', id: 4},
  ]

  const emojiList = emojis2.map(currentEmoji => <div className="statElement" key={currentEmoji.id} title={"Number of " + currentEmoji.label + " results"}>{currentEmoji.icon} __placeholder__  </div>);
  const handleSubmit = async () => {
    if (!selectedEmoji) return 
    console.log('Submitting: ', selectedEmoji,message)  // log the selected emoji and message for debugging
    setSubmitted(true)  // set submitted to true to show the message
  }

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4"> {/* Makes a screen the fit the whole screen with a black background and white text */}

    {/* Header */}
    <h1 className="text-5xl font-bold mb-2 text-purple-400">MoodMap</h1> {/* Title of the app with styling */}

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
      className="w-full max-w-md bg-gray-800 text-white rounded-xl p-4 mb-2 resize-none outline-none focus:ring-2 focus:ring-purple-500" /* Styling for the text area */
      rows={3}
    />

    {/* a message counter to let the user know how many characters till the limit */}
    <p className = "text-gray-500 text-sm mb-6 self-end max-w-md">
      {message.length}/200
    </p>
    
    <button 
      onClick={handleSubmit}
      disabled={!selectedEmoji}  // disable the button if no emoji is selected
      className = {`px-10 py-4 rounded-full text-lg font-bold transition-all duration-200 ${
        selectedEmoji 
        ? 'bg-purple-600 hover:bg-purple-500 cursor-pointer'
        : 'bg-gray-700 cursor-not-allowed opacity-50'
      }`}
    >
      Share My Mood
    </button>

    {submitted && (
      <p className = "mt-6 text-green-400 text-lg font-medium">
        Thank you for sharing your mood!🎊🫶🎉 Feel to browse the results page to see how others are feeling.
      </p>)}
     
    <div className="statsbar" key={emojiList.id}> 
	  <h2 className="statbarheaderA">StatsBar</h2>
	  <h3 className="statbarheaderB"><i>Emotion Statistics by the Numbers</i></h3>
	  <div>{emojiList}</div>
    </div>

      


  </main>
  )
}
