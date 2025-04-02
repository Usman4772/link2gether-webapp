import Heading from '@/components/Global/Heading';
import Paragraph from '@/components/Global/Paragraph';
import { Calender } from '@/components/icons/icons';
import useFetchUser from '@/hooks/useFetchUser';
import { getFormattedDate } from '@/utils/frontend/helpers/globals';

export interface UserProps{
  id: string | number;
  username: string;
  email: string;
  created_at: string;
  profileImage: string | null;

}

function Header({data}:{data: UserProps}) {
  return (
    <div className="flex justify-between items-center py-4">
      <div className="space-y-2">
        <Heading
      text={`Hello, ${data?.username || "User"}`}
          size="28px"
          className="font-bold"
        />
        <Paragraph text="Track team progress here. You almost reach a goal!" />
      </div>
      <div className="text-right">
        <div className="text-sm text-gray-500 flex items-center gap-4">
          <Calender className="w-5 h-5" />
          {getFormattedDate(data?.created_at)}
        </div>
      </div>
    </div>
  );
}

export default Header