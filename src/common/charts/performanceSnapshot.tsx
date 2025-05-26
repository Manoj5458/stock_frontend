import GaugeComponent from "react-gauge-component";
import "./performance-snapshot.css";
import Icon from "@mdi/react";
import { mdiSquareRounded } from "@mdi/js";
interface PerformanceSnapshotProps {
  stockScore: number; // Define the expected prop type
}

const PerformanceSnapshot: React.FC<PerformanceSnapshotProps> = ({
  stockScore,
}) => {
  return (
    <>
      {" "}
      <h3 className="text-2xl w-full text-center font-bold">
        Performance Snapshot
      </h3>
      <GaugeComponent
        type="semicircle"
        arc={{
          width: 0.2,
          padding: 0.02,
          cornerRadius: 5,
          // gradient: true,
          subArcs: [
            {
              limit: 40,
              color: "#e10c0c",
              showTick: true,
              tooltip: {
                text: "🛑 High Risk Zone",
              },
            },
            {
              limit: 60,
              color: "#F97316",
              showTick: true,
              tooltip: {
                text: "🧐 Mixed Signals",
              },
            },
            {
              limit: 80,
              color: "#3116e1",
              showTick: true,
              tooltip: {
                text: "👍 Good Potential",
              },
            },
            {
              limit: 100,
              color: "#15ed65",
              showTick: true,
              tooltip: {
                text: "🌟 Top Performer",
              },
            },
          ],
        }}
        pointer={{
          color: "#6f90d3",
          length: 0.8,
          width: 15,
          elastic: true,
        }}
        value={stockScore * 10}
        minValue={0}
        maxValue={100}
      />
      <ChartFooter />
    </>
  );
};

export default PerformanceSnapshot;

export const ChartFooter = () => {
  const zones = [
    {
      label: "High Risk Zone",
      className: "high-risk",
    },
    { label: "Mixed Signals", className: "mixed-signals" },
    { label: "Good Potential", className: "good-potential" },
    { label: "Top Performer", className: "top-performer" },
  ];

  return (
    <div className="grid grid-cols-4">
      {zones.map((zone, index) => (
        <div
          key={index}
          className={`flex gap-1 text-center items-center text-xs`}
        >
          <Icon
            className={`${zone.className}`}
            path={mdiSquareRounded}
            size={1}
          />
          {zone.label}
        </div>
      ))}
    </div>
  );
};
