interface User {
  id: string;
  name: string;
  email: string;
  phoneNumber?: string;
  gender?: 'MALE' | 'FEMALE';
  activeRides: string[]
}

interface Ride {
  id: string
  owner: {
    id: string
    name: string
    phoneNumber?: string
  }
  vehicleType: "CAR" | "AUTO" | "BUS"
  myInvite: Invite
  earliestDeparture: string
  latestDeparture: string
  prefersGender: "MALE" | "FEMALE" | null
  femaleCount: number
  capacity: number
  status: "PENDING" | "FULL" | "COMPLETED" | "CANCELLED"
  stops: [
    Stop, Stop
  ]
  participants:
  {
    id: string
    name: string
    gender: string
    phoneNumber?: string
  }[],
  myInvite?: Invite
  createdAt: string
}

interface ClusteredInvites {
  ride: Ride
  invites: Invite[]
}

interface Invite {
  id: string
  status: "PENDING" | "ACCEPTED" | "DECLINED"
  senderId: string
  receiverRideId: string
  receiverRide: Ride
  sender: { id: string; name: string; phoneNumber?: string }
  createdAt: string
  declineReason?: string
}

interface Stop {
  id: string;
  name: string;
}