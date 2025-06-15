import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { assets } from '../assets/assets'
import Loading from '../components/Loading'
import { ArrowRightIcon, ClockIcon } from 'lucide-react'
import isoTimeFormat from '../lib/isoTimeFormat'
import BlurCircle from '../components/BlurCircle'
import toast from 'react-hot-toast'
import { useAppContext } from '../context/AppContext'

const MAX_SELECTION = 5
const groupRows = [["A", "B"], ["C", "D"], ["E", "F"], ["G", "H"], ["I", "J"]]

const SeatButton = ({ seatId, isSelected, isOccupied, onClick }) => (
  <button
    onClick={onClick}
    disabled={isOccupied}
    className={`h-9 w-9 rounded-full border text-xs font-semibold flex items-center justify-center transition 
      ${isSelected ? 'bg-green-500 text-white shadow-md' :
        isOccupied ? 'bg-red-400 text-white opacity-70 cursor-not-allowed' :
          'bg-white text-gray-800 hover:bg-gray-200 active:scale-95'}
    `}
  >
    {seatId}
  </button>
)

const TimeSlot = ({ item, selected, onClick }) => (
  <div
    onClick={onClick}
    className={`flex items-center gap-2 px-6 py-2 w-max rounded-r-md cursor-pointer transition
      ${selected ? "bg-primary text-white" : "hover:bg-primary/20"}
    `}
  >
    <ClockIcon className="w-4 h-4" />
    <p className='text-sm'>{isoTimeFormat(item.time)}</p>
  </div>
)

const SeatLegend = () => (
  <div className='flex justify-center gap-6 mt-8 text-sm text-gray-300'>
    {[
      { label: 'Available', color: 'bg-white border' },
      { label: 'Selected', color: 'bg-green-500' },
      { label: 'Booked', color: 'bg-red-400' },
    ].map(({ label, color }) => (
      <div className='flex items-center gap-2' key={label}>
        <div className={`w-4 h-4 rounded-full ${color}`}></div> {label}
      </div>
    ))}
  </div>
)

const BookingSummary = ({ selectedSeats, price }) => (
  <div className='mt-10 text-center text-white'>
    <p className='text-lg font-medium'>Selected Seats: {selectedSeats.join(', ') || 'None'}</p>
    <p className='text-sm text-gray-300 mt-1'>Total Price: ₹{selectedSeats.length * price}</p>
  </div>
)

const SeatLayout = () => {
  const { id, date } = useParams()
  const { axios, getToken, user } = useAppContext()
  const [show, setShow] = useState(null)
  const [selectedSeats, setSelectedSeats] = useState([])
  const [selectedTime, setSelectedTime] = useState(null)
  const [occupiedSeats, setOccupiedSeats] = useState([])

  const fetchShow = async () => {
    try {
      const { data } = await axios.get(`/api/show/${id}`)
      if (data.success) setShow(data)
    } catch {
      toast.error('Failed to fetch show data')
    }
  }

  const fetchOccupiedSeats = React.useCallback(async () => {
    if (!selectedTime?.showId) return
    try {
      const { data } = await axios.get(`/api/booking/seats/${selectedTime.showId}`)
      if (data.success) setOccupiedSeats(data.occupiedSeats)
      else toast.error(data.message)
    } catch {
      toast.error('Error fetching occupied seats')
    }
  }, [axios, selectedTime])

  const handleSeatClick = (seatId) => {
    if (!selectedTime) return toast("Please select time first")
    if (occupiedSeats.includes(seatId)) return toast('This seat is already booked')
    if (!selectedSeats.includes(seatId) && selectedSeats.length >= MAX_SELECTION)
      return toast("You can only select 5 seats")

    setSelectedSeats(prev =>
      prev.includes(seatId) ? prev.filter(seat => seat !== seatId) : [...prev, seatId]
    )
  }

  const bookTickets = async () => {
    try {
      if (!user) return toast.error('Please login to proceed')
      if (!selectedTime || !selectedSeats.length) return toast.error('Please select a time and seats')

      const { data } = await axios.post(
        '/api/booking/create',
        { showId: selectedTime.showId, selectedSeats },
        { headers: { Authorization: `Bearer ${await getToken()}` } }
      )
      if (data.success) window.location.href = data.url
      else toast.error(data.message)
    } catch (err) {
      toast.error(err.message)
    }
  }

  const renderSeatRow = (row, count = 9) => (
    <div key={row} className="flex gap-2 mt-2">
      <div className="flex flex-wrap items-center justify-center gap-2">
        {Array.from({ length: count }, (_, i) => {
          const seatId = `${row}${i + 1}`
          return (
            <SeatButton
              key={seatId}
              seatId={seatId}
              isSelected={selectedSeats.includes(seatId)}
              isOccupied={occupiedSeats.includes(seatId)}
              onClick={() => handleSeatClick(seatId)}
            />
          )
        })}
      </div>
    </div>
  )

  useEffect(() => {
    fetchShow()
  }, [fetchShow])

  useEffect(() => {
    fetchOccupiedSeats()
  }, [fetchOccupiedSeats])

  if (!show) return <Loading />

  return (
    <div className='flex flex-col md:flex-row px-6 md:px-16 lg:px-40 py-20 md:pt-32 relative'>
      {/* Left: Timings */}
      <div className='w-full md:w-64 bg-primary/10 border border-primary/20 rounded-xl py-10 md:sticky md:top-28 h-max shadow'>
        <p className='text-lg font-semibold px-6'>Available Timings</p>
        <div className='mt-5 space-y-1'>
          {show.dateTime[date]?.map((item) => (
            <TimeSlot
              key={item.time}
              item={item}
              selected={selectedTime?.time === item.time}
              onClick={() => setSelectedTime(item)}
            />
          ))}
        </div>
      </div>

      {/* Right: Seat Layout */}
      <div className='relative flex-1 flex flex-col items-center max-md:mt-16'>
        <BlurCircle top="-100px" left="-100px" />
        <BlurCircle bottom="0" right="0" />

        <h1 className='text-2xl font-semibold mb-4'>Select Your Seat</h1>
        <img src={assets.screenImage} alt="screen" />
        <p className='text-gray-400 text-sm mb-6'>SCREEN SIDE</p>

        {/* Seat Map */}
        <div className='flex flex-col items-center mt-10 text-xs text-gray-300'>
          <div className='grid grid-cols-2 md:grid-cols-1 gap-8 md:gap-2 mb-6'>
            {groupRows[0].map(row => renderSeatRow(row))}
          </div>
          <div className='grid grid-cols-2  gap-11'>
            {groupRows.slice(1).map((group, idx) => (
              <div key={idx}>
                {group.map(row => renderSeatRow(row))}
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <SeatLegend />

        {/* Summary */}
        <BookingSummary selectedSeats={selectedSeats} price={show.ticketPrice} />

        {/* Proceed Button */}
        <button
          onClick={bookTickets}
          className='flex items-center gap-2 mt-10 px-10 py-3 text-sm bg-primary hover:bg-primary-dull transition rounded-full font-medium cursor-pointer active:scale-95'
        >
          Proceed to Checkout
          <ArrowRightIcon strokeWidth={3} className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}

export default SeatLayout
