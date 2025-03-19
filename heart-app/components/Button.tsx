import { useRouter } from "next/navigation";

interface ButtonProps {
  text: string | null;
  width?: number;  // Corrigido de "with" para "width"
}

const ButtonCustom: React.FC<ButtonProps> = ({ text, width = 100 }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push('/register/1'); 
  };


return (
  <button
      type="button"
      style={{ width: `${width}%` }}
      className="relative mt-6 w-full inline-flex h-[3.2rem] overflow-hidden rounded-lg p-[2px] focus:outline-none focus:ring-0"
      onClick={handleClick}
    >
      <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#ffcbcb_0%,#b23939_50%,#ffcbcb_100%)]"></span>
      <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg bg-black px-3 py-1 text-sm font-semibold text-white backdrop-blur-3xl">
        
        {text}
        
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="tabler-icon tabler-icon-chevron-right ml-4"
        >
          <path d="M9 6l6 6l-6 6"></path>
        </svg>
      </span>
    </button>
)
}

export default ButtonCustom;