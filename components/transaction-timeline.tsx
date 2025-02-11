import { CheckCircle, Clock, XCircle } from "lucide-react";

type TimelineStep = {
  status: "pending" | "processing" | "completed" | "failed";
  label: string;
};

type TransactionTimelineProps = {
  steps: TimelineStep[];
};

export function TransactionTimeline({ steps }: TransactionTimelineProps) {
  return (
    <div className="space-y-4">
      {steps.map((step, index) => (
        <div key={index} className="flex items-center">
          <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center">
            {step.status === "completed" && (
              <CheckCircle className="w-6 h-6 text-green-500" />
            )}
            {step.status === "processing" && (
              <Clock className="w-6 h-6 text-yellow-500 animate-pulse" />
            )}
            {step.status === "pending" && (
              <Clock className="w-6 h-6 text-gray-400" />
            )}
            {step.status === "failed" && (
              <XCircle className="w-6 h-6 text-red-500" />
            )}
          </div>
          <div className="ml-4 flex-grow">
            <p
              className={`text-sm font-medium ${
                step.status === "completed"
                  ? "text-green-500"
                  : step.status === "processing"
                  ? "text-yellow-500"
                  : step.status === "failed"
                  ? "text-red-500"
                  : "text-gray-400"
              }`}
            >
              {step.label}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
