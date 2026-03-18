import {supabase} from '@/lib/supabase'

export async function POST(request) {
    const body = await request.json()
    const {emoji, message, latitude, longitude} = body

    const {data, error} = await supabase
        .from('moods')
        .insert([{emoji, message, latitude, longitude}])
    
    if (error) {
        return Response.json({error: error.message}, {status: 500})
    }

    return Response.json({ success: true, data})
}