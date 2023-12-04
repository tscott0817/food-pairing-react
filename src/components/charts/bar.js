import { ResponsiveBar } from '@nivo/bar';

const Bar = () => {
    console.log("Bar Rendered")
  return (
    <ResponsiveBar
      data={data}
      keys={["degrees"]}
      indexBy="day"
      margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
      padding={0.4}
      valueScale={{ type: "linear" }}
      colors="#3182CE"
      animate={true}
      enableLabel={false}
      axisTop={null}
      axisRight={null}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "degrees",
        legendPosition: "middle",
        legendOffset: -40
      }}
      height={400} // Set a fixed height here
    />
  );
};

const data = [
  {
    day: "Monday",
    degrees: 59
  },
  {
    day: "Tuesday",
    degrees: 61
  },
  {
    day: "Wednesday",
    degrees: 55
  },
  {
    day: "Thursday",
    degrees: 78
  },
  {
    day: "Friday",
    degrees: 71
  },
  {
    day: "Saturday",
    degrees: 56
  },
  {
    day: "Sunday",
    degrees: 67
  }
];

export default Bar;