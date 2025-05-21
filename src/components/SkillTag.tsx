
interface SkillTagProps {
  name: string;
}

const SkillTag = ({ name }: SkillTagProps) => {
  return (
    <div className="bg-accent/20 text-white px-3 py-1 rounded-full text-sm hover:bg-accent/30 transition-colors">
      {name}
    </div>
  );
};

export default SkillTag;
