<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;

class EventController extends Controller
{
    function index(){
        $events = Event::orderBy('created_at','DESC')->get();
        return response()->json($events);
    }
    //authentified user events
    public function userEvents()
    {
        $events = auth()->user()->events()->get(); 

        return response()->json($events);
    }
    function store(Request $request){
       
        try {
            if($request->hasFile('image')) {
                $newEvent = $request->validate([
                    'title'=>'required',
                    'description'=>'required',
                    'image'=>'image|mimes:jpeg,png,jpg,gif'
                ]);
                $imageName = Str::random(32).".".$request->image->getClientOriginalExtension();
                $newEvent['image'] = $imageName;
                $newEvent['user_id'] = auth()->id();
                // Create Product
                Event::create($newEvent);
                // Save Image in Storage folder
                Storage::disk('public')->put('images/' . $imageName, file_get_contents($request->image));
            }else{
                $event = $request->validate([
                'title'=>'required',
                'description'=>'required',
                ]);
                $event["user_id"]=auth()->id();
                
                Event::create($event);
            }

            
            // Return Json Response
            return response()->json([
                'message' => "Event successfully created."
            ],200);
        } catch (\Exception $e) {
            // Return Json Response
            return response()->json([
                'message' => $e->getMessage()
            ],500);
        }
        
    }

    function destroy($id){
        $event = Event::find($id);

        if(!$event){
            return response()->json(['message'=>'Event not found',404]);
        }
        $event->delete();

        return response()->json(['message' => 'Event deleted successfully'], 200);

    }

    function update(Request $request,$id){
        $event = Event::find($id);
        if(!$event) { return response()->json(['message'=>'Event not found',404]);
        }
        
        if($request->hasFile('image')) {
            $newEvent = $request->validate([
                'title'=>'required',
                'description'=>'required',
                'image'=>'image'
            ]);
            // Public storage
            $storage = Storage::disk('public');
        
            // Old iamge delete
            if($storage->exists('images/' . $event->image))
                $storage->delete('images/' . $event->image);

            // Image name
            $imageName = Str::random(32).".".$request->image->getClientOriginalExtension();
            $newEvent['image'] = $imageName;

            // Image save in public folder
            $storage->put('images/' . $imageName, file_get_contents($request->image));
           
        }else{
            $newEvent = $request->validate([
                'title'=>'required',
                'description'=>'required',
            ]);
        }
         $event->update($newEvent);

        return response()->json(['message' => 'Event updated successfully', 'event' => $event], 200);

    }
}
