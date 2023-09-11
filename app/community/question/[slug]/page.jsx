import Navbar from "@/components/Navbar/Navbar";
import { userUrl } from "@/url";
import AddAnswer from "@/components/Community/AddAnswer";
import VoteBtn from "@/components/Community/VoteBtn";
import AnswerVote from "@/components/Community/AnswerVote";
import Sidebar from "@/components/Community/Sidebar";
async function getData(id) {
  const res = await fetch(`${userUrl}/community/question/${id}`, {
    next: { revalidate: 10 },
  });
  return res.json();
}
async function page({ params: { slug } }) {
  const { question } = await getData(slug);

  return (
    <div>
      <Navbar />
      <div className="w-full min-h-screen grid grid-cols-12 bg-emerald-100">
      <div className="hidden sm:block col-span-2 border-e-[1px] border-slate-400 ">
         <Sidebar/>
        </div>
        <div className=" col-span-full sm:col-span-10 md:col-span-7 border-s-[1px] border-slate-400">
          <div className="px-5  ">
            <h1 className="text-2xl font-semibold pt-5 capitalize">
              {question.title}
            </h1>
            <div className="flex  border-b-[1px] border-slate-400 items-center">
              <div className=" bg-black rounded-md h-7 w-7"></div>
              <div className="flex h-10 pl-1 overflow-hidden relative text-xs flex-col">
                <span className="absolute top-1">safavn</span>
                <span className=" font-light pt-4 ">
                  kottayilsafvan@gmail.com
                </span>
              </div>
              <div className="flex font-light text-xs pt-2 items-end">
                {" "}
                <p className="px-1 font-semibold"> asked</p>{" "}
                <p className="">Jul 31, 2008 at 22:08</p>
              </div>
            </div>
            <div className="flex border-b-[1px] border-slate-400">
              <div className="w-28 pt-7  text-2xl pr-2 flex items-center flex-col">
               <VoteBtn VOTE={question.vote} ID={question._id}/>
              </div>
              <div className="flex w-[90%] flex-grow flex-col">
                <pre
                  className="  pt-4 text-sm whitespace-normal"
                  dangerouslySetInnerHTML={{ __html: question.question }}
                ></pre>

                <div className="flex pl-5 pb-5 text-xs space-x-2">
                  {question.tags.map((tag) => {
                    return (
                      <p className="px-2 py-[3px] bg-emerald-500 rounded-sm">
                        {tag.tag_id.Tage}
                      </p>
                    );
                  })}
                </div>
              </div>
            </div>
            {/* answers */}
            <div className="border-b-[1px] border-slate-400">
              <h1 className="py-5"> Answers</h1>
              {question.answers.map((value) => {
                return (
                  <>
                    <div className=" flex ">
                      <div>
                        <div className="w-20 ">
                          <AnswerVote id={value._id} />
                        </div>
                      </div>

                      <div className="flex flex-grow w-6/6 flex-col ">
                        <pre
                          className=" pt-4 text-sm whitespace-normal"
                          dangerouslySetInnerHTML={{ __html: value.answer }}
                        ></pre>
                      </div>
                    </div>
                    <div className="flex justify-end border-b-[1px] border-slate-400 items-center">
                      <div className=" bg-black rounded-md h-7 w-7"></div>
                      <div className="flex h-10 pl-1 overflow-hidden relative text-xs flex-col">
                        <span className="absolute top-1">safavn</span>
                        <span className=" font-light pt-4 ">
                          kottayilsafvan@gmail.com
                        </span>
                      </div>
                      <div className="flex font-light text-xs pt-2 items-end">
                        {" "}
                        <p className="px-1 font-semibold"> asked</p>{" "}
                        <p className="">Jul 31, 2008 at 22:08</p>
                      </div>
                    </div>
                  </>
                );
              })}
            </div>

            <div className="border-b-[1px] border-slate-400">
              <h1 className="py-5">Your Answer</h1>
              <AddAnswer id={slug} />
            </div>
          </div>
        </div>
        <div className=" hidden md:block col-span-3"></div>
      </div>
    </div>
  );
}

export default page;
