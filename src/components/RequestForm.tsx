export function RequestForm({ email }: { email: string }) {
  return (
    <>
      <h2 className="mb-6 text-neutral-100 text-2xl tracking-tight font-bold sm:text-3xl">
        Request
      </h2>
      <form action="" className="space-y-8 content-center">
        <div>
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-neutral-300"
          >
            Your email
          </label>
          <input
            type="email"
            id="email"
            className="appearance-none focus:outline-none shadow-sm bg-transparent border-b border-neutral-200 text-neutral-200 text-sm block w-full p-2.5"
            defaultValue={email ?? ''}
            placeholder="example@gmail.com"
            required
          />
        </div>
        <div>
          <label
            htmlFor="subject"
            className="block mb-2 text-sm font-medium text-neutral-300"
          >
            Subject
          </label>
          <input
            type="text"
            id="subject"
            className="appearance-none focus:outline-none shadow-sm bg-transparent border-b border-neutral-200 text-neutral-200 text-sm block w-full p-2.5"
            placeholder="Let me know how I can help you"
            required
          />
        </div>
        <div className="sm:col-span-2">
          <label
            htmlFor="message"
            className="block mb-4 text-sm font-medium text-neutral-300"
          >
            Your message
          </label>
          <textarea
            id="message"
            rows={6}
            className="appearance-none focus:outline-none bg-transparent block p-2.5 w-full text-sm text-neutral-200 shadow-sm border border-neutral-200"
            placeholder="Leave a comment..."
          ></textarea>
        </div>
        <button
          type="submit"
          className="py-3 px-5 text-sm font-medium text-center text-neutral-200 border border-neutral-200 bg-transparent sm:w-fit hover:bg-neutral-800 transition ease-in-out duration-150"
        >
          Send message
        </button>
      </form>
    </>
  )
}
