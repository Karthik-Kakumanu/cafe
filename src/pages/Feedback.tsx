import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { UpgradeBanner } from "@/components/UpgradeBanner";
import { usePlan } from "@/lib/planContext";
import { feedbacks } from "@/lib/mockData";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Star, MessageSquare, Lock } from "lucide-react";

const Feedback = () => {
  const { limits } = usePlan();
  const [respondingTo, setRespondingTo] = useState<string | null>(null);
  const [responseText, setResponseText] = useState("");

  const renderStars = (rating: number) => (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={`h-3.5 w-3.5 ${i < rating ? "text-primary fill-primary" : "text-muted"}`} />
      ))}
    </div>
  );

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-[26px] font-display">Feedback</h1>
          <p className="text-sm text-muted-foreground mt-1">Customer reviews and ratings</p>
        </div>

        {!limits.hasFeedbackReply && (
          <UpgradeBanner feature="Feedback Replies" description="Reply to customer reviews, manage sentiment, and build relationships. Upgrade to Growth Pack." compact />
        )}

        {/* Summary */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-card rounded-2xl border p-4 text-center">
            <p className="text-2xl font-display font-bold">4.4</p>
            <p className="text-xs text-muted-foreground">Avg Rating</p>
            <div className="flex justify-center mt-1">{renderStars(4)}</div>
          </div>
          <div className="bg-card rounded-2xl border p-4 text-center">
            <p className="text-2xl font-display font-bold">{feedbacks.length}</p>
            <p className="text-xs text-muted-foreground">Total Reviews</p>
          </div>
          <div className="bg-card rounded-2xl border p-4 text-center">
            <p className="text-2xl font-display font-bold">{feedbacks.filter(f => f.response).length}</p>
            <p className="text-xs text-muted-foreground">Responded</p>
          </div>
        </div>

        {/* Feedback List */}
        <div className="space-y-3">
          {feedbacks.map((fb) => (
            <div key={fb.id} className="bg-card rounded-2xl border p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="text-sm font-medium">{fb.customerName}</p>
                  <p className="text-xs text-muted-foreground">{fb.date}</p>
                </div>
                {renderStars(fb.rating)}
              </div>
              <p className="text-sm text-foreground mb-3">{fb.comment}</p>

              {fb.response && (
                <div className="bg-background rounded-xl border p-3 ml-4">
                  <p className="text-xs font-medium text-muted-foreground mb-1">Your Response</p>
                  <p className="text-sm">{fb.response}</p>
                </div>
              )}

              {!fb.response && limits.hasFeedbackReply && respondingTo !== fb.id && (
                <Button size="sm" variant="outline" className="text-xs h-7 rounded-lg" onClick={() => setRespondingTo(fb.id)}>
                  <MessageSquare className="h-3 w-3 mr-1" /> Respond
                </Button>
              )}

              {!fb.response && !limits.hasFeedbackReply && (
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Lock className="h-3 w-3" />
                  <span>Reply requires Growth Pack</span>
                </div>
              )}

              {respondingTo === fb.id && (
                <div className="mt-2 space-y-2 animate-fade-in">
                  <Textarea
                    placeholder="Write your response..."
                    value={responseText}
                    onChange={(e) => setResponseText(e.target.value)}
                    className="text-sm min-h-[60px] rounded-xl"
                  />
                  <div className="flex gap-2">
                    <Button size="sm" className="text-xs h-7 rounded-lg">Send Response</Button>
                    <Button size="sm" variant="outline" className="text-xs h-7 rounded-lg" onClick={() => { setRespondingTo(null); setResponseText(""); }}>Cancel</Button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Feedback;
