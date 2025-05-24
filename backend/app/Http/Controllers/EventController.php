<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Illuminate\Http\Request;

class EventController extends Controller
{
    public function index(Request $request)
    {
        $events = Event::query();

        // Filter by category if provided
        if ($request->has('category')) {
            $events->where('category', $request->category);
        }

        // Sort by date (default) or other fields
        $sortBy = $request->get('sort_by', 'date');
        $sortDir = $request->get('sort_dir', 'asc');
        $events->orderBy($sortBy, $sortDir);

        $events = $events->get();

        // Add full image URL
        $events->transform(function ($event) {
            if ($event->image_path) {
                $event->image_url = asset('storage/' . $event->image_path);
            }
            return $event;
        });

        return response()->json($events);
    }

    public function show($id)
    {
        $event = Event::findOrFail($id);
        $event->registered_count = $event->registeredCount;

        // Add full image URL
        if ($event->image_path) {
            $event->image_url = asset('storage/' . $event->image_path);
        }

        // Add registration status for current user if authenticated
        if (auth()->check()) {
            $event->is_registered = $event->registrations()
                ->where('user_id', auth()->id())
                ->exists();
        }

        return response()->json($event);
    }
}
