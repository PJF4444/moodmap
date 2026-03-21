'use client'

<<<<<<< HEAD
import { useRouter } from 'next/navigation'   // only takes what is needed for this code to work
=======
import './styles.css';
export default function Home() {
  const [selectedEmoji, setSelectedEmoji] = useState('')  // state to keep track of the selected option
  const [message, setMessage] = useState('')  // state to keep track of the message to display
  const [submitted, setSubmitted] = useState(false)  // state to keep track of whether the form has been submitted
>>>>>>> fd4049a66a162068b91e11bb477fb330195795a3

export default function Welcome() {
  const router = useRouter()  // initialize the router for navigation

<<<<<<< HEAD
  
=======

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
>>>>>>> fd4049a66a162068b91e11bb477fb330195795a3

  return (
    <main className = "min-h-screen bg-black-950 text-white flex flex-col items-center justify-center p-8">
    
    {/* Logo and Title */}

    <p className = "text-8xl mb-6">🌿</p>
    <h1 className = "text-5xl font-bold mb-4 text-green-400">Welcome to EcoMood</h1>

    {/* Tagline */}
    <p className = "text-blue-300 text-xl mb-12 text-center max-w-md">
      Helping communities understand and share their feelings about the environment around them.
    </p>

    {/* Features */}
<div className="flex flex-col gap-4 mb-12 max-w-md w-full">
  
  <div className="bg-blue-900 rounded-xl p-4 flex gap-4 items-center">
    <span className="text-3xl">🗺️</span>
    <div>
      <p className="font-bold text-green-400">Live Environment Map</p>
      <p className="text-blue-300 text-sm">See real time environmental reports from your community</p>
    </div>
  </div>

  <div className="bg-blue-900 rounded-xl p-4 flex gap-4 items-center">
    <span className="text-3xl">🤖</span>
    <div>
      <p className="font-bold text-green-400">AI EcoReport</p>
      <p className="text-blue-300 text-sm">Daily AI analysis of your city's environmental health</p>
    </div>
  </div>

  <div className="bg-blue-900 rounded-xl p-4 flex gap-4 items-center">
    <span className="text-3xl">🌿</span>
    <div>
      <p className="font-bold text-green-400">Anonymous Reporting</p>
      <p className="text-blue-300 text-sm">Share your environment safely — no account needed</p>
    </div>
  </div>

</div>
    {/* Get Started Button */}
    <button 
      onClick ={() => router.push('/moodmap')}  // navigate to the moodmap page when clicked
      className = "px-12 py-4 bg-green-600 hover:bg-green-500 text-white text-xl font-bold rounded-full transition-all duration-200"
    >
      Get Started 😎
    </button> 

<<<<<<< HEAD
    </main>
  )
}


=======
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
>>>>>>> fd4049a66a162068b91e11bb477fb330195795a3
