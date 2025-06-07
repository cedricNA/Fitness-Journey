import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

interface DataPoint {
  date: string;
  value: number;
}

interface ProgressChartProps {
  data: DataPoint[];
  color: string;
  minValue?: number;
  maxValue?: number;
  unit?: string;
}

export default function ProgressChart({ 
  data, 
  color, 
  minValue = 0, 
  maxValue = 100, 
  unit = '' 
}: ProgressChartProps) {
  const chartWidth = width - 80;
  const chartHeight = 120;
  
  if (data.length === 0) {
    return (
      <View style={styles.emptyChart}>
        <Text style={styles.emptyText}>Aucune donnée disponible</Text>
      </View>
    );
  }

  const actualMin = minValue || Math.min(...data.map(d => d.value));
  const actualMax = maxValue || Math.max(...data.map(d => d.value));
  const range = actualMax - actualMin || 1;

  return (
    <View style={styles.container}>
      <View style={[styles.chartContainer, { width: chartWidth, height: chartHeight }]}>
        {/* Grid lines */}
        {[0, 0.25, 0.5, 0.75, 1].map((ratio, index) => (
          <View
            key={index}
            style={[
              styles.gridLine,
              {
                bottom: ratio * chartHeight,
                width: chartWidth,
              }
            ]}
          />
        ))}
        
        {/* Data points and line */}
        {data.map((point, index) => {
          const x = (index / (data.length - 1)) * (chartWidth - 20) + 10;
          const y = ((point.value - actualMin) / range) * (chartHeight - 20) + 10;
          
          return (
            <View key={index}>
              {/* Line to next point */}
              {index < data.length - 1 && (
                <View
                  style={[
                    styles.line,
                    {
                      left: x,
                      bottom: y,
                      width: Math.sqrt(
                        Math.pow((chartWidth - 20) / (data.length - 1), 2) +
                        Math.pow(
                          ((data[index + 1].value - actualMin) / range) * (chartHeight - 20) -
                          ((point.value - actualMin) / range) * (chartHeight - 20),
                          2
                        )
                      ),
                      transform: [
                        {
                          rotate: `${Math.atan2(
                            ((data[index + 1].value - actualMin) / range) * (chartHeight - 20) -
                            ((point.value - actualMin) / range) * (chartHeight - 20),
                            (chartWidth - 20) / (data.length - 1)
                          )}rad`
                        }
                      ],
                      backgroundColor: color,
                    }
                  ]}
                />
              )}
              
              {/* Data point */}
              <View
                style={[
                  styles.dataPoint,
                  {
                    left: x - 4,
                    bottom: y - 4,
                    backgroundColor: color,
                  }
                ]}
              />
              
              {/* Value label */}
              <Text
                style={[
                  styles.valueLabel,
                  {
                    left: x - 15,
                    bottom: y + 8,
                    color: color,
                  }
                ]}
              >
                {point.value}{unit}
              </Text>
            </View>
          );
        })}
      </View>
      
      {/* X-axis labels */}
      <View style={styles.xAxisContainer}>
        <Text style={styles.axisLabel}>
          {new Date(data[0].date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}
        </Text>
        <Text style={styles.axisLabel}>
          {new Date(data[data.length - 1].date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  chartContainer: {
    position: 'relative',
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    marginBottom: 8,
  },
  emptyChart: {
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
  },
  emptyText: {
    color: '#9CA3AF',
    fontSize: 14,
  },
  gridLine: {
    position: 'absolute',
    height: 1,
    backgroundColor: '#E5E7EB',
  },
  line: {
    position: 'absolute',
    height: 2,
    transformOrigin: 'left center',
  },
  dataPoint: {
    position: 'absolute',
    width: 8,
    height: 8,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: 'white',
  },
  valueLabel: {
    position: 'absolute',
    fontSize: 10,
    fontWeight: '600',
    textAlign: 'center',
    width: 30,
  },
  xAxisContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  axisLabel: {
    fontSize: 12,
    color: '#9CA3AF',
  },
});