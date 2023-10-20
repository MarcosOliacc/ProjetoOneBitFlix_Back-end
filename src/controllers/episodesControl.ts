import { Request, Response } from "express";
import { episodeService } from "../services/episodeService";

export const episodesController = {
    // GET /episodes/stream?videoUrl=...
    stream: async (req:Request, res: Response) => {
        const { videoUrl } = req.query

        try {
            if(typeof videoUrl !== 'string') throw new Error('params is not string')

            const range = req.headers.range

            episodeService.stramEpisodeWithResponse(res, videoUrl, range)

        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ message: error.message })
            }
        }
    }
}