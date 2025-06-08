import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
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
    <View style={styles.container}>
      <View style={styles.timerDisplay}>
        <Text style={styles.timeText}>{formatTime(time)}</Text>
        <Text style={styles.statusText}>
          {!isRunning ? 'Prêt' : isPaused ? 'En pause' : 'En cours'}
        </Text>
      </View>
      
      <View style={styles.controls}>
        {!isRunning || isPaused ? (
          <TouchableOpacity
            testID="start-button"
            style={[styles.button, styles.playButton]}
            onPress={handleStart}
          >
            <Play size={20} color="white" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            testID="pause-button"
            style={[styles.button, styles.pauseButton]}
            onPress={handlePause}
          >
            <Pause size={20} color="white" />
          </TouchableOpacity>
        )}

        <TouchableOpacity
          testID="stop-button"
          style={[styles.button, styles.stopButton]}
          onPress={handleStop}
        >
          <Square size={20} color="white" />
        </TouchableOpacity>

        <TouchableOpacity
          testID="reset-button"
          style={[styles.button, styles.resetButton]}
          onPress={handleReset}
        >
          <RotateCcw size={20} color="#6B7280" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  timerDisplay: {
    alignItems: 'center',
    marginBottom: 20,
  },
  timeText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#1F2937',
    fontFamily: 'monospace',
  },
  statusText: {
    fontSize: 16,
    color: '#6B7280',
    marginTop: 8,
  },
  controls: {
    flexDirection: 'row',
    gap: 16,
  },
  button: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playButton: {
    backgroundColor: '#10B981',
  },
  pauseButton: {
    backgroundColor: '#F59E0B',
  },
  stopButton: {
    backgroundColor: '#EF4444',
  },
  resetButton: {
    backgroundColor: '#F3F4F6',
  },
});