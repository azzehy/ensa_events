<?php

namespace Database\Seeders;

use App\Models\Event;
use Illuminate\Database\Seeder;

class EventsSeeder extends Seeder
{
    public function run()
    {
        $events = [
            [
                'title' => 'ENSA Tech Conference 2023',
                'description' => 'Annual technology conference for engineering students',
                'date' => '2023-11-15',
                'time' => '09:00:00',
                'location' => 'Main Auditorium',
                'capacity' => 200,
                'category' => 'Tech',
                'image_path' => null, // Updated from image_url to image_path
            ],
            [
                'title' => 'Engineering Workshop 2023',
                'description' => 'Hands-on workshop for all engineering students',
                'date' => '2023-12-05',
                'time' => '14:00:00',
                'location' => 'Lab Building B',
                'capacity' => 50,
                'category' => 'Workshop',
                'image_path' => null,
            ],
            // Add more sample events as needed
        ];
        
        foreach ($events as $event) {
            Event::create($event);
        }
    }
}