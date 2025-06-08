import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Play, Pause, Square, RotateCcw } from 'lucide-react-native';

interface WorkoutTimerProps {
  onComplete?: () => void;
  initialTime?: number;
}

export default function WorkoutTimer({ onComplete, initialTime = 0 }: WorkoutTimerProps) {
  const [time, setTime] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isRunning && !isPaused) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    }
    
    return () => clearInterval(interval);
  }, [isRunning, isPaused]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStart = () => {
    setIsRunning(true);
    setIsPaused(false);
  };

  const handlePause = () => {
    setIsPaused(true);
  };

  const handleStop = () => {
    setIsRunning(false);
    setIsPaused(false);
    onComplete?.();
  };

  const handleReset = () => {
    setTime(initialTime);
    setIsRunning(false);
    setIsPaused(false);
  };

  return (
    <View className="items-center rounded-2xl bg-white p-5 shadow" >
      <View className="mb-5 items-center">
        <Text className="font-mono text-5xl font-bold text-gray-800">
          {formatTime(time)}
        </Text>
        <Text className="mt-2 text-base text-gray-500">
          {!isRunning ? 'Prêt' : isPaused ? 'En pause' : 'En cours'}
        </Text>
      </View>

      <View className="flex-row gap-4">
        {!isRunning || isPaused ? (
          <TouchableOpacity
            testID="start-button"
            className="h-14 w-14 items-center justify-center rounded-full bg-emerald-500"
            onPress={handleStart}
          >
            <Play size={20} color="white" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            testID="pause-button"
            className="h-14 w-14 items-center justify-center rounded-full bg-amber-500"
            onPress={handlePause}
          >
            <Pause size={20} color="white" />
          </TouchableOpacity>
        )}

        <TouchableOpacity
          testID="stop-button"
          className="h-14 w-14 items-center justify-center rounded-full bg-red-500"
          onPress={handleStop}
        >
          <Square size={20} color="white" />
        </TouchableOpacity>

        <TouchableOpacity
          testID="reset-button"
          className="h-14 w-14 items-center justify-center rounded-full bg-gray-100"
          onPress={handleReset}
        >
          <RotateCcw size={20} color="#6B7280" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
