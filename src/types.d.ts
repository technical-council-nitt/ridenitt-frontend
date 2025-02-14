interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  gender: string;
}

interface Ride {
  id: string
  owner: {
    id: string
    name: string
  }
  vehicleType: "CAR" | "AUTO" | "TAXI"
  myInvite: Invite
  earliestDeparture: string
  latestDeparture: string
  peopleCount: number
  femaleCount: number
  capacity: number
  status: "PENDING" | "FULL" | "COMPLETED" | "CANCELLED"
  stops: [
    Stop, Stop
  ]
  participants: [
    {
      id: string
      name: string
      phoneNumber?: string
      gender: "MALE" | "FEMALE"
    }
  ],
  participantsCount?: number
  myInvite?: Invite
}

interface Invite {
  id: string
  status: "PENDING" | "ACCEPTED" | "DECLINED"
  senderId: string
  receiverRideId: string
}

interface Stop {
  id: string;
  name: string;
}