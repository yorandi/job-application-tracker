type ApplicationStatus = 
  |"Applied"
  |"Screening"
  |"Interview"
  |"Offer"
  |"Rejected";

type statusBadgeProps = {
    status: ApplicationStatus;
}

function getStatusClass(status: ApplicationStatus){
    switch(status){
        case "Applied":
            return "bg-blue-500/10 text-blue-400";
        case "Screening":
            return "bg-yellow-500/10 text-yellow-400"; 
        case "Interview":
            return "bg-purple-500/10 text-purple-400";
        case "Offer":   
            return "bg-green-500/10 text-green-400";
        case "Rejected":
            return "bg-red-500/10 text-red-400";
    }
}

export default function StatusBadge({
    status,
}: statusBadgeProps){
    return(
        <span className={`rounded-xl px-3 py-1 text-sm font-medium ${getStatusClass(status)}`}>
            {status}
        </span>
    )
}