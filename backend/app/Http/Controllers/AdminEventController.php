<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage as FacadesStorage;

class AdminEventController extends Controller
{
    public function __construct()
    {
        // $this->middleware(function ($request, $next) {
        //     if (!auth()->user()->isAdmin()) {
        //         return response()->json(['message' => 'Unauthorized'], 403);
        //     }
        //     return $next($request);
        // });
        if (!auth()->check() || !auth()->user()->isAdmin()) {
            abort(403, 'Unauthorized');
        }
    }

    public function index()
    {
        $events = Event::withCount('registrations')->latest()->get();
        return response()->json($events);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'date' => 'required|date',
            'time' => 'required',
            'location' => 'required|string',
            'capacity' => 'nullable|integer|min:1',
            'category' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048', 
        ]);

        // Handle image upload
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('events', 'public');
            $validated['image_path'] = $imagePath;
        }

        $event = Event::create($validated);

        return response()->json($event, 201);
    }

    public function update(Request $request, $id)
    {
        $event = Event::findOrFail($id);

        $validated = $request->validate([
            'title' => 'sometimes|string|max:255',
            'description' => 'sometimes|string',
            'date' => 'sometimes|date',
            'time' => 'sometimes',
            'location' => 'sometimes|string',
            'capacity' => 'nullable|integer|min:1',
            'category' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048', // Image validation
        ]);

        // Handle image upload
        if ($request->hasFile('image')) {
            // Delete old image if exists
            if ($event->image_path) {
                FacadesStorage::disk('public')->delete($event->image_path);
            }

            $imagePath = $request->file('image')->store('events', 'public');
            $validated['image_path'] = $imagePath;
        }

        $event->update($validated);

        return response()->json($event);
    }

    public function destroy($id)
    {
        $event = Event::findOrFail($id);

        // Delete image if exists
        if ($event->image_path) {
            FacadesStorage::disk('public')->delete($event->image_path);
        }

        $event->delete();

        return response()->json(['message' => 'Event deleted successfully']);
    }
    public function registrations($eventId)
    {
        $event = Event::findOrFail($eventId);
        $registrations = $event->registrations()->with('user:id,name,email')->get();

        return response()->json($registrations);
    }
}
