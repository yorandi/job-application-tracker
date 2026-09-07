type ApplicationStatus = 
  |"APPLIED"
  |"SCREENING"
  |"INTERVIEW"
  |"OFFER"
  |"REJECTED";

type statusBadgeProps = {
    status: ApplicationStatus;
}

function getStatusClass(status: ApplicationStatus){
    switch(status){
        case "APPLIED":
            return "bg-blue-500/10 text-blue-400";
        case "SCREENING":
            return "bg-yellow-500/10 text-yellow-400"; 
        case "INTERVIEW":
            return "bg-purple-500/10 text-purple-400";
        case "OFFER":   
            return "bg-green-500/10 text-green-400";
        case "REJECTED":
            return "bg-red-500/10 text-red-400";
    }
}
function formatStatus(status: ApplicationStatus) {
  return status.charAt(0) + status.slice(1).toLowerCase();
}
export default function StatusBadge({
    status,
}: statusBadgeProps){
    return(
        <span className={`rounded-xl px-3 py-1 text-sm font-medium ${getStatusClass(status)}`}>
            {formatStatus(status)}
        </span>
    )
}