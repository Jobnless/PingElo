import { Router } from "express";

import { supabase } from "../supabase.js"

//Authentication required for performing actions
import { requireAuth, AuthenticatedRequest } from "../middleware/requireAuth.js";

//Services required for routes
import { createPlayer } from "../services/players.services.js"

const router = Router();

//Route for creating a new player
router.post('/create', requireAuth, async (req: AuthenticatedRequest, res) => {
    try {
        //Check if the user making the request is an admin
        const { data: profile } = await supabase
            .from("profiles")
            .select("is_admin")
            .eq("id", req.user!.id)
            .single();

        //If the user is not an admin then throw an error
        if (!profile?.is_admin) {
            return res.status(403).json({ error: "Admin privileges required" });
        }

        //Gets username from the request
        const { username } = req.body;

        //If there is no username an error is thrown
        if (!username) {
            return res.status(400).json({ error: "Player name required" });
        }

        //createPlayer is called with the parameter username
        const player = await createPlayer(username);

        //A success response is sent with the player's id, username and claim code
        res.status(201).json({
            message: "Player created successfully",
            player
        });
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
});

export default router;