export type RoutineStep = {
    id: string;
    title: string;
    duration: number; // in seconds
    instruction: string;
    videoUrl?: string;
};

export type Routine = {
    id: string;
    title: string;
    description: string;
    duration: string;
    color: string;
    steps: RoutineStep[];
};

export const EXERCISE_BANK: RoutineStep[] = [
    { id: "touch-sky", title: "Touch the Sky", duration: 30, instruction: "Reach as high as you can with both hands!" },
    { id: "touch-toes", title: "Touch Your Toes", duration: 30, instruction: "Bend at the waist and reach for your toes." },
    { id: "butterfly-stretch", title: "Butterfly Stretch", duration: 60, instruction: "Sit with feet together and flap your knees like wings." },
    { id: "neck-rolls", title: "Neck Rolls", duration: 30, instruction: "Gently roll your neck in slow circles." },
    { id: "arm-circles", title: "Arm Circles", duration: 30, instruction: "Make big circles with your arms like a windmill." },
    { id: "jumping-jacks", title: "Jumping Jacks", duration: 30, instruction: "Jump and spread your arms and legs!" },
    { id: "frog-squats", title: "Frog Squats", duration: 45, instruction: "Squat low like a frog and hop back up." },
    { id: "tree-pose", title: "Tree Pose", duration: 30, instruction: "Balance on one leg and be as still as a tree." },
    { id: "childs-pose", title: "Child's Pose", duration: 60, instruction: "Kneel and stretch your arms forward on the floor." },
    { id: "cat-cow", title: "Cat-Cow", duration: 45, instruction: "On hands and knees, arch your back like a grumpy cat, then dip it like a happy cow." },
];

export const routines: Routine[] = [
    {
        id: "morning-stretch",
        title: "Morning Sunshine",
        description: "Wake up your body with these gentle stretches!",
        duration: "5 min",
        color: "bg-orange-400",
        steps: [
            EXERCISE_BANK[3], // Neck Rolls
            EXERCISE_BANK[0], // Touch the Sky
            EXERCISE_BANK[1], // Touch Your Toes
        ],
    },
    {
        id: "splits-training",
        title: "Splits Training",
        description: "Get closer to your splits every day.",
        duration: "10 min",
        color: "bg-teal-400",
        steps: [
            { id: "lunge-left", title: "Low Lunge (Left)", duration: 60, instruction: "Step forward with your left leg and sink your hips." },
            { id: "hamstring-stretch", title: "Hamstring Stretch", duration: 60, instruction: "Straighten your front leg and fold forward." },
        ],
    },
    {
        id: "bedtime-calm",
        title: "Bedtime Calm",
        description: "Relax before going to sleep.",
        duration: "5 min",
        color: "bg-indigo-400",
        steps: [
            EXERCISE_BANK[8], // Child's Pose
        ],
    },
    {
        id: "power-up",
        title: "Power Up",
        description: "Quick energy boost!",
        duration: "3 min",
        color: "bg-yellow-400",
        steps: [
            EXERCISE_BANK[5], // Jumping Jacks
        ],
    },
];
