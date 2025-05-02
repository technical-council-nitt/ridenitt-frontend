import { useState } from "react"
import { displayTimeRange } from "../../../Utils/datetime"
import RideDetailsModal from "./RideDetailsModal"
import { useAuth } from "../../../Hooks/useAuth"
import axios from "axios"
import { toast } from "react-toastify"
import Prompt from "../../../Components/Prompt"

export default function SentRequest({
  request,
  refreshRequests
}: {
  request: Invite
  refreshRequests: () => void
}) {
  const [leavePromptOpen, setLeavePromptOpen] = useState(false)
  const [detailsModalOpen, setDetailsModalOpen] = useState(false)
  const [leaveLoading, setLeaveLoading] = useState(false)
  const { user } = useAuth()
  const ride = request.receiverRide
  const st = new Date(ride.earliestDeparture)
  const ed = new Date(ride.latestDeparture)

  const now = new Date()
  const isExpired = ed < now

  const handleLeave = (reason: string) => {
    setLeaveLoading(true)

    if (!reason) {
      setLeaveLoading(false)
      return
    }

    axios
      .post(`/api/invites/${request.id}/decline`, {
        reason: reason
      })
      .then(() => {
        refreshRequests()
        toast.success(
          request.status === "PENDING"
            ? "Cancelled request successfully"
            : "Left ride successfully"
        )
      })
      .catch(err => {
        console.error(err)
        toast.error(
          request.status === "PENDING"
            ? "Failed to cancel request"
            : "Failed to leave ride"
        )
      })
      .finally(() => setLeaveLoading(false))
  }

  // shouldShowButton: ride not expired AND (pending OR accepted+active)
  const shouldShowButton =
    !isExpired &&
    (request.status === "PENDING" ||
      (request.status === "ACCEPTED" &&
        user?.activeRides.includes(request.receiverRideId)))

  return (
    <li className="p-2 border-2 border-green-700 rounded-xl">
      <RideDetailsModal
        currentUserId={user?.id}
        ride={ride}
        open={detailsModalOpen}
        onClose={() => setDetailsModalOpen(false)}
      />

      {leavePromptOpen && (
        <Prompt
          label={
            request.status === "PENDING"
              ? "Reason for cancelling"
              : "Reason for leaving"
          }
          onCancel={() => setLeavePromptOpen(false)}
          onConfirm={v => handleLeave(v)}
        />
      )}

      <div className="flex gap-2 justify-between items-start">
        <div role="button" onClick={() => setDetailsModalOpen(true)}>
          <div>
            <strong>{ride.owner.name}</strong>
            {request.status === "ACCEPTED" && (
              <span className="block text-neutral-700">
                {ride.owner.phoneNumber}
              </span>
            )}
          </div>
          <span className="text-neutral-600">
            {ride.vehicleType} | {ride.participants.length} people sharing
          </span>
          <br />
        </div>

        <div className="flex flex-col items-end gap-2">
          <span
            role="button"
            onClick={() => setDetailsModalOpen(true)}
            className="mb-2 block text-neutral-600 font-Quicksand text-sm"
          >
            {displayTimeRange(st, ed, now)}
          </span>

          {isExpired ? (
            <span className="text-gray-500 font-semibold">Expired</span>
          ) : shouldShowButton ? (
            <button
              disabled={leaveLoading}
              onClick={() => setLeavePromptOpen(true)}
              className="disabled:opacity-50 mt-2 w-24 text-xs p-1 border-2 border-red-600 bg-red-100 text-neutral-800 rounded-lg font-semibold"
            >
              {request.status === "PENDING" ? "Cancel" : "Leave"}
            </button>
          ) : (
            <span
              className={`${
                request.status === "PENDING"
                  ? "text-yellow-600"
                  : request.status === "ACCEPTED"
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {request.declineReason?.startsWith("Left:")
                ? "You Left"
                : request.status[0] +
                  request.status.substring(1).toLowerCase()}
            </span>
          )}
        </div>
      </div>
    </li>
  )
}
