<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'date',
        'time',
        'location',
        'image_path',
        'capacity',
        'category'
    ];
    public function registrations()
    {
        return $this->hasMany(Registration::class);
    }

    public function users()
    {
        return $this->belongsToMany(User::class, 'registrations');
    }

    public function getRegisteredCountAttribute()
    {
        return $this->registrations()->count();
    }
}
