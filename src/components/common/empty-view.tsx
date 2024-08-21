import EmptyIlllustrationIcon from "../icons/empty-illlustration.icon";

interface IProps {
  title: string;
  desc: string;
}

export const Empty = ({ title, desc }: IProps) => {
  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-[800px] max-h-[400px] bg-white flex-col shadow-sm rounded-xl border-stroke border p-6 sm:py-12 flex justify-center items-center sm:px-8">
        <EmptyIlllustrationIcon />

        <div className="flex gap-1 pt-4 pb-6 justify-center flex-col">
          <h4 className="text-center text-gray-900 font-medium text-base sm:text-lg">
            {title}
          </h4>
          <p className="text-center text-gray-600 text-sm">{desc}</p>
        </div>
      </div>
    </div>
  );
};
