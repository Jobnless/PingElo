//For using supabase calls
import { supabase } from "../supabase.js";

//For generating claim codes
import { v4 as uuidv4 } from "uuid";

//Used for creating a claimable player
export async function createPlayer(
    username: string
) {
    //Generate a unique claim code for the player
    const claimCode = uuidv4().slice(0, 6).toUpperCase();

    //Create the new player in players
    const { data, error } = await supabase
        .from("players")
        .insert({
            username: username,
            claim_code: claimCode,
            user_id: null
        })
        .select()
        .single();
    
    //If there was an error or there is no data returned
    if (error || !data) {
        throw new Error(error?.message || "Failed to create player");
    }

    //Return the player's ID, username and claim code
    return {
        id: data.id,
        username: data.username,
        claimCode: data.claim_code
    }
}