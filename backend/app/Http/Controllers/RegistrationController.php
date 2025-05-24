<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\Registration;
use Illuminate\Http\Request;

class RegistrationController extends Controller
{
    public function register(Request $request)
    {
        $request->validate([
            'event_id' => 'required|exists:events,id',
        ]);
        
        $event = Event::findOrFail($request->event_id);
        
        // Check if event has capacity
        if ($event->capacity && $event->registeredCount >= $event->capacity) {
            return response()->json(['message' => 'Event is at full capacity'], 400);
        }
        
        // Check if already registered
        $exists = Registration::where('user_id', auth()->id())
            ->where('event_id', $request->event_id)
            ->exists();
            
        if ($exists) {
            return response()->json(['message' => 'Already registered for this event'], 400);
        }
        
        $registration = Registration::create([
            'user_id' => auth()->id(),
            'event_id' => $request->event_id,
        ]);
        
        return response()->json([
            'message' => 'Successfully registered for event',
            'registration' => $registration
        ], 201);
    }
    
    public function cancel(Request $request)
    {
        $request->validate([
            'event_id' => 'required|exists:events,id',
        ]);
        
        $deleted = Registration::where('user_id', auth()->id())
            ->where('event_id', $request->event_id)
            ->delete();
            
        if (!$deleted) {
            return response()->json(['message' => 'Registration not found'], 404);
        }
        
        return response()->json(['message' => 'Registration canceled successfully']);
    }
    
    public function userEvents()
    {
        $registrations = auth()->user()->registrations()->with('event')->get();
        return response()->json($registrations);
    }
}