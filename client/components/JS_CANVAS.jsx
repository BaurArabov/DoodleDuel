import * as tf from "@tensorflow/tfjs";
import * as tflite from "@tensorflow/tfjs-converter";
import Chart from "chart.js/auto";
import React, { useEffect, useRef, useState } from "react";

const WIDTH = 500;
const HEIGHT = 500;
const STROKE_WEIGHT = 3;
const CROP_PADDING = 2;
const LABELS = [
  "The Eiffel Tower",
  "The Great Wall of China",
  "The Mona Lisa",
  "aircraft carrier",
  "airplane",
  "alarm clock",
  "ambulance",
  "angel",
  "animal migration",
  "ant",
  "anvil",
  "apple",
  "arm",
  "asparagus",
  "axe",
  "backpack",
  "banana",
  "bandage",
  "barn",
  "baseball",
  "baseball bat",
  "basket",
  "basketball",
  "bat",
  "bathtub",
  "beach",
  "bear",
  "beard",
  "bed",
  "bee",
  "belt",
  "bench",
  "bicycle",
  "binoculars",
  "bird",
  "birthday cake",
  "blackberry",
  "blueberry",
  "book",
  "boomerang",
  "bottlecap",
  "bowtie",
  "bracelet",
  "brain",
  "bread",
  "bridge",
  "broccoli",
  "broom",
  "bucket",
  "bulldozer",
  "bus",
  "bush",
  "butterfly",
  "cactus",
  "cake",
  "calculator",
  "calendar",
  "camel",
  "camera",
  "camouflage",
  "campfire",
  "candle",
  "cannon",
  "canoe",
  "car",
  "carrot",
  "castle",
  "cat",
  "ceiling fan",
  "cell phone",
  "cello",
  "chair",
  "chandelier",
  "church",
  "circle",
  "clarinet",
  "clock",
  "cloud",
  "coffee cup",
  "compass",
  "computer",
  "cookie",
  "cooler",
  "couch",
  "cow",
  "crab",
  "crayon",
  "crocodile",
  "crown",
  "cruise ship",
  "cup",
  "diamond",
  "dishwasher",
  "diving board",
  "dog",
  "dolphin",
  "donut",
  "door",
  "dragon",
  "dresser",
  "drill",
  "drums",
  "duck",
  "dumbbell",
  "ear",
  "elbow",
  "elephant",
  "envelope",
  "eraser",
  "eye",
  "eyeglasses",
  "face",
  "fan",
  "feather",
  "fence",
  "finger",
  "fire hydrant",
  "fireplace",
  "firetruck",
  "fish",
  "flamingo",
  "flashlight",
  "flip flops",
  "floor lamp",
  "flower",
  "flying saucer",
  "foot",
  "fork",
  "frog",
  "frying pan",
  "garden",
  "garden hose",
  "giraffe",
  "goatee",
  "golf club",
  "grapes",
  "grass",
  "guitar",
  "hamburger",
  "hammer",
  "hand",
  "harp",
  "hat",
  "headphones",
  "hedgehog",
  "helicopter",
  "helmet",
  "hexagon",
  "hockey puck",
  "hockey stick",
  "horse",
  "hospital",
  "hot air balloon",
  "hot dog",
  "hot tub",
  "hourglass",
  "house",
  "house plant",
  "hurricane",
  "ice cream",
  "jacket",
  "jail",
  "kangaroo",
  "key",
  "keyboard",
  "knee",
  "knife",
  "ladder",
  "lantern",
  "laptop",
  "leaf",
  "leg",
  "light bulb",
  "lighter",
  "lighthouse",
  "lightning",
  "line",
  "lion",
  "lipstick",
  "lobster",
  "lollipop",
  "mailbox",
  "map",
  "marker",
  "matches",
  "megaphone",
  "mermaid",
  "microphone",
  "microwave",
  "monkey",
  "moon",
  "mosquito",
  "motorbike",
  "mountain",
  "mouse",
  "moustache",
  "mouth",
  "mug",
  "mushroom",
  "nail",
  "necklace",
  "nose",
  "ocean",
  "octagon",
  "octopus",
  "onion",
  "oven",
  "owl",
  "paint can",
  "paintbrush",
  "palm tree",
  "panda",
  "pants",
  "paper clip",
  "parachute",
  "parrot",
  "passport",
  "peanut",
  "pear",
  "peas",
  "pencil",
  "penguin",
  "piano",
  "pickup truck",
  "picture frame",
  "pig",
  "pillow",
  "pineapple",
  "pizza",
  "pliers",
  "police car",
  "pond",
  "pool",
  "popsicle",
  "postcard",
  "potato",
  "power outlet",
  "purse",
  "rabbit",
  "raccoon",
  "radio",
  "rain",
  "rainbow",
  "rake",
  "remote control",
  "rhinoceros",
  "rifle",
  "river",
  "roller coaster",
  "rollerskates",
  "sailboat",
  "sandwich",
  "saw",
  "saxophone",
  "school bus",
  "scissors",
  "scorpion",
  "screwdriver",
  "sea turtle",
  "see saw",
  "shark",
  "sheep",
  "shoe",
  "shorts",
  "shovel",
  "sink",
  "skateboard",
  "skull",
  "skyscraper",
  "sleeping bag",
  "smiley face",
  "snail",
  "snake",
  "snorkel",
  "snowflake",
  "snowman",
  "soccer ball",
  "sock",
  "speedboat",
  "spider",
  "spoon",
  "spreadsheet",
  "square",
  "squiggle",
  "squirrel",
  "stairs",
  "star",
  "steak",
  "stereo",
  "stethoscope",
  "stitches",
  "stop sign",
  "stove",
  "strawberry",
  "streetlight",
  "string bean",
  "submarine",
  "suitcase",
  "sun",
  "swan",
  "sweater",
  "swing set",
  "sword",
  "syringe",
  "t-shirt",
  "table",
  "teapot",
  "teddy-bear",
  "telephone",
  "television",
  "tennis racquet",
  "tent",
  "tiger",
  "toaster",
  "toe",
  "toilet",
  "tooth",
  "toothbrush",
  "toothpaste",
  "tornado",
  "tractor",
  "traffic light",
  "train",
  "tree",
  "triangle",
  "trombone",
  "truck",
  "trumpet",
  "umbrella",
  "underwear",
  "van",
  "vase",
  "violin",
  "washing machine",
  "watermelon",
  "waterslide",
  "whale",
  "wheel",
  "windmill",
  "wine bottle",
  "wine glass",
  "wristwatch",
  "yoga",
  "zebra",
  "zigzag",
];

// Other constants and functions remain the same

const DrawingPrediction = () => {
  const canvasRef = useRef(null);
  const [pieChart, setPieChart] = useState(null);
  const [imageStrokes, setImageStrokes] = useState([]);
  const [strokePixels, setStrokePixels] = useState([[], []]);
  const [model, setModel] = useState(null);

  let clicked = false;
  let mousePosition = [];

  useEffect(() => {
    const loadModel = async () => {
      console.log("Model loading...");

      const loadedModel = await tflite.loadGraphModel(
        "file:///home/baur/Рабочий стол/nfactorial-incubator/draw-with-ai/client/components/model.tflite"
      );
      loadedModel.predict(tf.zeros([1, 28, 28, 1])); // warmup

      console.log(`Model loaded! (${LABELS.length} classes)`);
      setModel(loadedModel); // Set the loaded model in the state
    };

    loadModel();
  }, []);

  const inRange = (n, from, to) => {
    return n >= from && n < to;
  };

  const getMinimumCoordinates = () => {
    let min_x = Number.MAX_SAFE_INTEGER;
    let min_y = Number.MAX_SAFE_INTEGER;

    for (const stroke of imageStrokes) {
      for (let i = 0; i < stroke[0].length; i++) {
        min_x = Math.min(min_x, stroke[0][i]);
        min_y = Math.min(min_y, stroke[1][i]);
      }
    }

    return [Math.max(0, min_x), Math.max(0, min_y)];
  };

  const repositionImage = () => {
    const [min_x, min_y] = getMinimumCoordinates();
    const newImageStrokes = [];

    for (const stroke of imageStrokes) {
      const newStrokeX = stroke[0].map((x) => x - min_x + REPOS_PADDING);
      const newStrokeY = stroke[1].map((y) => y - min_y + REPOS_PADDING);
      newImageStrokes.push([newStrokeX, newStrokeY]);
    }

    setImageStrokes(newImageStrokes);
  };

  // Other functions remain the same

  const getBoundingBox = () => {
    let min_x = Number.MAX_SAFE_INTEGER;
    let min_y = Number.MAX_SAFE_INTEGER;
    let max_x = Number.MIN_SAFE_INTEGER;
    let max_y = Number.MIN_SAFE_INTEGER;

    for (const stroke of imageStrokes) {
      for (let i = 0; i < stroke[0].length; i++) {
        min_x = Math.min(min_x, stroke[0][i]);
        max_x = Math.max(max_x, stroke[0][i]);
        min_y = Math.min(min_y, stroke[1][i]);
        max_y = Math.max(max_y, stroke[1][i]);
      }
    }

    const coords_min = {
      x: Math.max(0, min_x - CROP_PADDING),
      y: Math.max(0, min_y - CROP_PADDING),
    };

    const coords_max = {
      x: Math.min(WIDTH, max_x + CROP_PADDING),
      y: Math.min(HEIGHT, max_y + CROP_PADDING),
    };

    return {
      min: coords_min,
      max: coords_max,
    };
  };

  const preprocess = async (cb) => {
    const { min, max } = getBoundingBox();

    const imageBlob = await fetch("http://localhost:8000/transform", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify({
        strokes: imageStrokes,
        box: [min.x, min.y, max.x, max.y],
      }),
    }).then((response) => response.blob());

    console.log(
      JSON.stringify({
        strokes: imageStrokes,
        box: [min.x, min.y, max.x, max.y],
      })
    );

    const img = new Image();
    img.src = URL.createObjectURL(imageBlob);

    img.onload = () => {
      const tensor = tf.tidy(() =>
        tf.browser.fromPixels(img, 1).toFloat().expandDims(0)
      );
      cb(tensor);
    };
  };

  const drawPie = (top3) => {
    const probs = [];
    const labels = [];

    for (const pred of top3) {
      const prop = +pred.probability.toPrecision(2);
      probs.push(prop);
      labels.push(`${pred.className} (${prop})`);
    }

    const others = +(
      1 - probs.reduce((prev, prob) => prev + prob, 0)
    ).toPrecision(2);
    probs.push(others);
    labels.push(`Others (${others})`);

    if (pieChart) pieChart.destroy();

    const ctx = document.getElementById("predictions").getContext("2d");
    const newPieChart = new Chart(ctx, {
      type: "pie",
      options: {
        plugins: {
          legend: {
            position: "bottom",
          },
          title: {
            display: true,
            text: "Top 3 Predictions",
          },
        },
      },
      data: {
        labels,
        datasets: [
          {
            label: "Top 3 predictions",
            data: probs,
            backgroundColor: [
              "rgb(255, 99, 132)",
              "rgb(54, 162, 235)",
              "rgb(255, 205, 86)",
              "rgb(97,96,96)",
            ],
          },
        ],
      },
    });
    setPieChart(newPieChart);
  };

  const predict = async () => {
    if (!imageStrokes.length) return;
    if (!LABELS.length) throw new Error("No labels found!");

    // Check if the model is available
    if (!model) {
      console.error("Model not loaded yet.");
      return;
    }

    preprocess((tensor) => {
      const predictions = model.predict(tensor).dataSync();

      const top3 = Array.from(predictions)
        .map((p, i) => ({
          probability: p,
          className: LABELS[i],
          index: i,
        }))
        .sort((a, b) => b.probability - a.probability)
        .slice(0, 3);

      drawPie(top3);
      console.log(top3);
    });
  };

  const clearCanvas = () => {
    const ctx = canvasRef.current.getContext("2d");
    ctx.clearRect(0, 0, WIDTH, HEIGHT);

    if (pieChart) pieChart.destroy();

    setImageStrokes([]);
    setStrokePixels([[], []]);
  };

  const mouseDown = (e) => {
    clicked = true;
    const canvasRect = canvasRef.current.getBoundingClientRect();
    const canvasX = e.clientX - canvasRect.left;
    const canvasY = e.clientY - canvasRect.top;
    mousePosition = [canvasX, canvasY];
  };

  const mouseMoved = (e) => {
    if (clicked && canvasRef.current) {
      const canvasRect = canvasRef.current.getBoundingClientRect();
      const canvasX = e.clientX - canvasRect.left;
      const canvasY = e.clientY - canvasRect.top;

      if (inRange(canvasX, 0, WIDTH) && inRange(canvasY, 0, HEIGHT)) {
        strokePixels[0].push(Math.floor(canvasX));
        strokePixels[1].push(Math.floor(canvasY));

        const ctx = canvasRef.current.getContext("2d");
        ctx.beginPath();
        ctx.moveTo(mousePosition[0], mousePosition[1]);
        ctx.lineTo(canvasX, canvasY);
        ctx.stroke();

        mousePosition = [canvasX, canvasY];
      }
    }
  };

  const mouseReleased = () => {
    if (strokePixels[0].length) {
      setImageStrokes([...imageStrokes, strokePixels]);
      setStrokePixels([[], []]);
    }
    clicked = false;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.addEventListener("mousedown", mouseDown);
    canvas.addEventListener("mousemove", mouseMoved);
    canvas.addEventListener("mouseup", mouseReleased);

    return () => {
      canvas.removeEventListener("mousedown", mouseDown);
      canvas.removeEventListener("mousemove", mouseMoved);
      canvas.removeEventListener("mouseup", mouseReleased);
    };
  }, []);

  return (
    <div>
      <canvas
        id="defaultCanvas0"
        ref={canvasRef}
        width={WIDTH}
        height={HEIGHT}
        style={{ border: "1px solid black" }}
      ></canvas>
      <button onClick={predict}>Predict</button>
      <button onClick={clearCanvas}>Clear</button>
      <div>
        <canvas id="predictions" width={200} height={200}></canvas>
      </div>
    </div>
  );
};

export default DrawingPrediction;
