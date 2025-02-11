import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function LiveAuctions() {
  const auctions = [
    {
      id: 1,
      image: "/placeholder.svg?height=300&width=300",
      name: "Hamlet Contemplates ...",
      creator: "SalvadorDali",
      currentBid: "4.89 ETH",
      timeLeft: "3h 50m 2s",
    },
    // Add more auctions...
  ]

  return (
    <section className="container mx-auto px-4">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold">Live Auctions</h2>
        <Button variant="outline">Explore More</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {auctions.map((auction) => (
          <Card key={auction.id} className="bg-gray-900 border-gray-800">
            <CardContent className="p-4">
              <img src={auction.image || "/placeholder.svg"} alt={auction.name} className="w-full rounded-lg" />
            </CardContent>
            <CardFooter className="flex flex-col gap-4 p-4">
              <div className="flex justify-between items-center w-full">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback>SD</AvatarFallback>
                  </Avatar>
                  <div className="text-sm">{auction.creator}</div>
                </div>
                <div className="text-sm text-purple-500">
                  Current Bid
                  <div className="font-bold text-white">{auction.currentBid}</div>
                </div>
              </div>
              <div className="text-xs text-gray-400 text-right">{auction.timeLeft} left</div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  )
}

