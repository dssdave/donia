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
    {
        id: "power-up",
        title: "Power Up",
        description: "Quick energy boost!",
        duration: "3 min",
        color: "bg-brand-yellow",
        steps: [
            {
                id: "jumping-jacks",
                title: "Jumping Jacks",
                duration: 30,
                instruction: "Jump and spread your arms and legs!",
            },
        ],
    },
    {
        id: "core-strength",
        title: "Core Crusher",
        description: "Build a strong middle.",
        duration: "7 min",
        color: "bg-brand-blue",
        steps: [
            {
                id: "plank",
                title: "Plank",
                duration: 30,
                instruction: "Hold a push-up position with your elbows on the floor.",
            },
        ],
    },
    {
        id: "leg-day",
        title: "Leg Legend",
        description: "Strong legs for jumping.",
        duration: "8 min",
        color: "bg-brand-green",
        steps: [
            {
                id: "squats",
                title: "Frog Squats",
                duration: 45,
                instruction: "Squat down low like a frog and stand back up.",
            },
        ],
    },
    {
        id: "balance-beam",
        title: "Balance Beam",
        description: "Stay steady like a ninja.",
        duration: "5 min",
        color: "bg-brand-orange",
        steps: [
            {
                id: "tree-pose",
                title: "Tree Pose",
                duration: 30,
                instruction: "Stand on one leg and bring your other foot to your calf.",
            },
        ],
    },
    {
        id: "flex-master",
        title: "Flex Master",
        description: "Ultimate flexibility training.",
        duration: "12 min",
        color: "bg-brand-purple",
        steps: [
            {
                id: "butterfly",
                title: "Butterfly Stretch",
                duration: 60,
                instruction: "Sit with feet together and flap your knees like wings.",
            },
        ],
    },
    {
        id: "speedy-stretch",
        title: "Speedy Stretch",
        description: "When you're in a hurry.",
        duration: "2 min",
        color: "bg-brand-red",
        steps: [
            {
                id: "arm-circles",
                title: "Arm Circles",
                duration: 30,
                instruction: "Make big circles with your arms.",
            },
        ],
    },
    {
        id: "shoulder-release",
        title: "Shoulder Release",
        description: "Loosen up those shoulders.",
        duration: "4 min",
        color: "bg-brand-indigo",
        steps: [
            {
                id: "shrugs",
                title: "Shoulder Shrugs",
                duration: 30,
                instruction: "Lifty your shoulders to your ears and drop them.",
            },
        ],
    },
];
