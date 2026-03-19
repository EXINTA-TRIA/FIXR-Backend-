import Draft from "../models/draft.model.js";

export const saveDraft = async (req, res) => {
    try {
        const userId = req.user.id;
        const { data } = req.body;

        const draft = await Draft.findOneAndUpdate(
            { userId },
            { data },
            { new: true, upsert: true }
        );

        res.status(200).json(draft);
    } catch (error) {
        console.error("Error saving draft:", error);
        res.status(500).json({ message: "Failed to save draft" });
    }
};

export const getDraft = async (req, res) => {
    try {
        const userId = req.user.id;

        const draft = await Draft.findOne({ userId });
        res.status(200).json(draft || { data: null });
    } catch (error) {
        console.error("Error getting draft:", error);
        res.status(500).json({ message: "Failed to fetch draft" });
    }
};

export const deleteDraft = async (req, res) => {
    try {
        const userId = req.user.id;

        await Draft.findOneAndDelete({ userId });
        res.status(200).json({ message: "Draft deleted" });
    } catch (error) {
        console.error("Error deleting draft:", error);
        res.status(500).json({ message: "Failed to delete draft" });
    }
};
