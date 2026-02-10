export type RoutineStep = {
    id: string;
    title: string;
    duration: number; // in seconds
    instruction: string;
    videoUrl?: string; // Placeholder for now
};

export type Routine = {
    id: string;
    title: string;
    description: string;
    duration: string;
    color: string; // Tailwind color class or hex
    steps: RoutineStep[];
};

export const routines: Routine[] = [
    {
        id: "morning-stretch",
        title: "Morning Sunshine",
        description: "Wake up your body with these gentle stretches!",
        duration: "5 min",
        color: "bg-brand-pink",
        steps: [
            {
                id: "neck-roll",
                title: "Neck Rolls",
                duration: 30,
                instruction: "Gently roll your neck in a circle. Nice and slow!",
            },
            {
                id: "sky-reach",
                title: "Reach for the Sky",
                duration: 30,
                instruction: "Stand on your tiptoes and reach up high!",
            },
            {
                id: "toe-touch",
                title: "Toe Touches",
                duration: 45,
                instruction: "Bend down and try to touch your toes. Keep legs straight!",
            },
        ],
    },
    {
        id: "splits-training",
        title: "Splits Training",
        description: "Get closer to your splits every day.",
        duration: "10 min",
        color: "bg-brand-teal",
        steps: [
            {
                id: "lunge-left",
                title: "Low Lunge (Left)",
                duration: 60,
                instruction: "Step forward with your left leg and sink your hips.",
            },
            {
                id: "hamstring-stretch",
                title: "Hamstring Stretch",
                duration: 60,
                instruction: "Straighten your front leg and fold forward.",
            },
        ],
    },
    {
        id: "bedtime-calm",
        title: "Bedtime Calm",
        description: "Relax before going to sleep.",
        duration: "5 min",
        color: "bg-brand-lavender",
        steps: [
            {
                id: "childs-pose",
                title: "Child's Pose",
                duration: 60,
                instruction: "Kneel down and stretch your arms forward on the floor.",
            },
        ],
    },
];
