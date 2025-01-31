// import MailingList from "@/components/MailingList"
// import NewMailingForm from "@/components/NewMailingForm"

export default function Home() {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Mailing Scheduler</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Scheduled Mailings</h2>
          {/* <MailingList /> */}
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Create New Mailing</h2>
          {/* <NewMailingForm /> */}
        </div>
      </div>
    </main>
  );
}
