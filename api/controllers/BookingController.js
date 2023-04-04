const uuid = require("uuid-random")

module.exports = {

    booking: async (req, res) => {
        const { date, guest, time } = req.body
        userId = req.userData.uuid

        if (!date || !guest || !time) {
            return res.send({ Error: "Please in the required field" })
        }
        if (guest < 2 || guest > 6) {
            return res.send({ Message: "Number of guest should be between 2 to 6 " })
        }

        // Date format MM/DD/YYYY
        const validateDate = /^02\/(?:[01]\d|2\d)\/(?:19|20)(?:0[048]|[13579][26]|[2468][048])|(?:0[13578]|10|12)\/(?:[0-2]\d|3[01])\/(?:19|20)\d{2}|(?:0[469]|11)\/(?:[0-2]\d|30)\/(?:19|20)\d{2}|02\/(?:[0-1]\d|2[0-8])\/(?:19|20)\d{2}$/
        if (!(validateDate.test(String(date)))) {
            return res.send({ Error: "Please enter valid date" })
        }

        // Time Format in 24 Hours in HH:MM(00:00 to 23:00)
        const validateTime =  /^([0-1]?[0-9]|[2][0-3]):([0-5][0-9])(:[0-5][0-9])?$/
        // const validateTime = /^([1-9]|0[1-9]|1[0-2]):[0-5][0-9] ([AaPp][Mm])$/
        if (!(validateTime).test(String(time))) {
            return res.send({ Error: "Please enter valid time" })
        }

        const currentDate = new Date()
        const datetime = date.concat(" ", time)
        if (Date.parse(datetime) < Date.parse(currentDate)) {
            return res.send({ Message: "Date or Time is out of booking period" })
        }
        // const currentDate = new Date().toLocaleDateString()
        // if (Date.parse(date) < Date.parse(currentDate)) {
        //     return res.send({ Error: "Date is out of booking peroid" })
        // }
        // const currentTime = new Date().toLocaleTimeString()
        // if (time < currentTime) {
        //     return res.send({ Message: "Time is out of booking peroid" })
        // }

        const d = new Date(date)
        const Day = d.getDay()
        if (Day == 0 || Day == 3) {
            return res.send({ Message: "Restaurant is closed" })
        }
        const t = new Date(datetime)
        const Time = t.getHours()
        if( d.getMonth() == currentDate.getMonth() && d.getDate() == currentDate.getDate() && Time == currentDate.getHours()+1 ) {
            return res.send({Message : "You cannot book table now"})
        }
        
        const alreadyBooked = await Booking.findOne({
            userId: userId,
            date: date,
            guest: guest,
            time: time
        })
        if (alreadyBooked) {
            return res.send({ Message: "You have already booked the table" })
        }

        const booking = await Booking.create({
            id: uuid(),
            userId: userId,
            date: date,
            guest: guest,
            time: time
        }).fetch()
        return res.send({
            Message: "Your table is booked successfully",
            bookedTable: booking
        })
    },

    cancel: async (req, res) => {
        const userId = req.userData.uuid
        const { bookingId } = req.body

        if (!bookingId) {
            return res.send({ Error: "Booking ID is required" })
        }
        const booking = await Booking.findOne({ id: bookingId, userId: userId })
        if (!booking) {
            return res.send({ Message: "Booking ID not found...Please enter valid ID" })
        }
        const alreadyCancelled = await Booking.findOne({ id: bookingId, userId: userId, isDeleted: true })
        if (alreadyCancelled) {
            return res.send({ Message: "Table not found or may be already cancelled" })
        }
        else {
            const cancelling = await Booking.updateOne({ userId: userId, id: bookingId, isDeleted: false }).set({ isDeleted: true })
            return res.send({
                Message: "Table is cancelled successfully",
                cancelledTable: cancelling
            })
        }
    }
};

