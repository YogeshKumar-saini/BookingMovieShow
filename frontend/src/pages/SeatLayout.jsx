import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { assets, dummyDateTimeData, dummyShowsData } from "../assets/assets";
import Loading from "../components/Loading";
import { ArrowRightIcon, ClockIcon } from "lucide-react";
import isoTimeFormat from "../lib/isoTimeformat";
import BlurCircle from "../components/BlurCircle";
import toast from "react-hot-toast";

const SeatLayout = () => {
  const navigate = useNavigate();
  const { id, date } = useParams();

  const groupRows = [
    ["A", "B"],
    ["C", "D"],
    ["E", "F"],
    ["G", "H"],
    ["I", "J"],
  ];

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedTime, setSelectedTime] = useState(null);
  const [show, setShow] = useState(null);

  useEffect(() => {
    const movie = dummyShowsData.find((s) => s._id == id);
    if (movie) {
      setShow({
        movie,
        dateTime: dummyDateTimeData,
      });
    }
  }, [id]);

  const handleSeatClick = (seatId) => {
    if (!selectedTime) {
      return toast("Please select time first");
    }
    if (!selectedSeats.includes(seatId) && selectedSeats.length >= 5) {
      return toast("You can only select up to 5 seats");
    }
    setSelectedSeats((prev) =>
      prev.includes(seatId)
        ? prev.filter((seat) => seat !== seatId)
        : [...prev, seatId]
    );
  };

  const renderSeats = (row, count = 9) => (
    <div key={row} className="flex flex-wrap gap-2">
      {Array.from({ length: count }, (_, i) => {
        const seatId = `${row}${i + 1}`;
        const isSelected = selectedSeats.includes(seatId);
        return (
          <button
            key={seatId}
            onClick={() => handleSeatClick(seatId)}
            className={`h-9 w-9 rounded border border-primary text-sm transition font-medium ${
              isSelected
                ? "bg-primary text-white"
                : "hover:bg-primary/20 text-gray-200"
            }`}
          >
            {seatId}
          </button>
        );
      })}
    </div>
  );

  return show ? (
    <div className="flex flex-col md:flex-row px-4 sm:px-8 lg:px-32 py-20 gap-12 relative">
      {/* Blur Effects */}
      <BlurCircle top="-100px" left="-100px" />
      <BlurCircle bottom="0" right="0" />

      {/* Left Sidebar – Timings */}
      <div className="md:w-60 w-full bg-white/5 border border-white/10 rounded-xl p-6 md:sticky md:top-28 shadow-sm">
        <p className="text-lg font-semibold text-white mb-4">Available Timings</p>
        <div className="space-y-2">
          {show.dateTime[date]?.map((item) => (
            <div
              key={item.time}
              onClick={() => setSelectedTime(item)}
              className={`flex items-center gap-2 px-4 py-2 rounded-md cursor-pointer transition ${
                selectedTime?.time === item.time
                  ? "bg-primary text-white"
                  : "hover:bg-primary/10 text-gray-300"
              }`}
            >
              <ClockIcon className="w-4 h-4" />
              <span className="text-sm">{isoTimeFormat(item.time)}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right – Seat Layout */}
      <div className="flex-1 flex flex-col items-center">
        <h1 className="text-2xl font-semibold text-white mb-4">Select Your Seat</h1>

        <img src={assets.screenImage} alt="screen" className="mb-1" />
        <p className="text-sm text-gray-400 mb-8">SCREEN THIS SIDE</p>

        {/* Rows */}
        <div className="flex flex-col items-center text-xs text-white gap-8">
          {/* First 2 rows grid */}
          <div className="grid grid-cols-2 md:grid-cols-1 gap-4 md:gap-2">
            {groupRows[0].map((row) => renderSeats(row))}
          </div>

          {/* Remaining rows in 2-column grid */}
          <div className="grid grid-cols-2 gap-10 sm:gap-12 md:gap-14 lg:gap-20">
            {groupRows.slice(1).map((group, index) => (
              <div key={index} className="space-y-4">
                {group.map((row) => renderSeats(row))}
              </div>
            ))}
          </div>
        </div>

        {/* Proceed Button */}
        <button
          onClick={() => navigate("/my-bookings")}
          className="flex items-center gap-2 mt-16 px-10 py-3 text-sm bg-primary text-white hover:bg-primary-dull transition rounded-full font-medium active:scale-95 shadow-md"
        >
          Proceed to Checkout
          <ArrowRightIcon className="w-4 h-4" strokeWidth={3} />
        </button>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default SeatLayout;

