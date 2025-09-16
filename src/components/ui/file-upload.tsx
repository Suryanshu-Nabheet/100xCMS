import { cn } from "../../lib/utils";
import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Upload, X, Camera } from "lucide-react";

const mainVariant = {
  initial: {
    x: 0,
    y: 0,
  },
  animate: {
    x: 20,
    y: -20,
    opacity: 0.9,
  },
};

const secondaryVariant = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
};

export const FileUpload = ({
  onChange,
}: {
  onChange?: (files: File[]) => void;
}) => {
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (newFiles: File[]) => {
    setFiles(newFiles);
    onChange && onChange(newFiles);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(e.target.files || []);
    handleFileChange(newFiles);
  };

  const removeFile = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index);
    handleFileChange(newFiles);
  };

  return (
    <div className="w-full" onClick={handleClick}>
      <motion.div
        onClick={handleClick}
        whileHover="animate"
        className="p-8 group/file block rounded-professional cursor-pointer w-full relative overflow-hidden liquid-glass border border-blue-500/20 hover:border-blue-400/40 transition-all duration-300"
      >
        <input
          ref={fileInputRef}
          id="file-upload-handle"
          type="file"
          accept="image/*"
          onChange={handleFileInputChange}
          className="hidden"
        />
        <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]">
          <GridPattern />
        </div>
        <div className="flex flex-col items-center justify-center relative z-10">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center mb-4 glow-blue group-hover/file:scale-110 transition-transform duration-300">
            <Camera className="w-8 h-8 text-white" />
          </div>
          <p className="relative z-20 font-sans font-bold text-white text-base mb-2">
            Upload profile picture
          </p>
          <p className="relative z-20 font-sans font-normal text-white/60 text-sm text-center">
            Drag or drop your profile image here or click to browse
          </p>
          <div className="relative w-full mt-6 max-w-xl mx-auto">
            {files.length > 0 &&
              files.map((file, idx) => (
                <motion.div
                  key={"file" + idx}
                  layoutId={idx === 0 ? "file-upload" : "file-upload-" + idx}
                  className={cn(
                    "relative overflow-hidden z-40 liquid-glass flex flex-col items-start justify-start md:h-24 p-4 mt-4 w-full mx-auto rounded-professional border border-blue-500/20",
                    "shadow-lg"
                  )}
                >
                  <div className="flex justify-between w-full items-center gap-4">
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      layout
                      className="text-base text-white truncate max-w-xs"
                    >
                      {file.name}
                    </motion.p>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      layout
                      className="rounded-professional px-3 py-1 w-fit flex-shrink-0 text-sm text-white/80 glass"
                    >
                      {(file.size / (1024 * 1024)).toFixed(2)} MB
                    </motion.p>
                  </div>

                  <div className="flex text-sm md:flex-row flex-col items-start md:items-center w-full mt-2 justify-between text-white/60">
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      layout
                      className="px-2 py-1 rounded-professional bg-blue-600/20 text-blue-300 text-xs"
                    >
                      {file.type}
                    </motion.p>

                    <motion.button
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      layout
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFile(idx);
                      }}
                      className="mt-2 md:mt-0 text-red-400 hover:text-red-300 transition-colors p-1 rounded-professional hover:bg-red-500/10"
                    >
                      <X className="w-4 h-4" />
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            {!files.length && (
              <motion.div
                layoutId="file-upload"
                variants={mainVariant}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                }}
                className={cn(
                  "relative group-hover/file:shadow-2xl z-40 liquid-glass flex items-center justify-center h-32 mt-4 w-full max-w-[8rem] mx-auto rounded-professional border border-blue-500/20",
                  "shadow-lg glow-blue"
                )}
              >
                <Upload className="h-6 w-6 text-white" />
              </motion.div>
            )}

            {!files.length && (
              <motion.div
                variants={secondaryVariant}
                className="absolute opacity-0 border border-dashed border-blue-400/50 inset-0 z-30 bg-transparent flex items-center justify-center h-32 mt-4 w-full max-w-[8rem] mx-auto rounded-professional"
              ></motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export function GridPattern() {
  const columns = 41;
  const rows = 11;
  return (
    <div className="flex liquid-glass flex-shrink-0 flex-wrap justify-center items-center gap-x-px gap-y-px scale-105">
      {Array.from({ length: rows }, (_, row) =>
        Array.from({ length: columns }, (_, col) => {
          const index = row * columns + col;
          return (
            <div
              key={`${col}-${row}`}
              className={`w-10 h-10 flex flex-shrink-0 rounded-[2px] ${
                index % 2 === 0
                  ? "bg-blue-950/20"
                  : "bg-blue-950/20 shadow-[0px_0px_0px_3px_rgba(59,130,246,0.1)_inset]"
              }`}
            />
          );
        })
      )}
    </div>
  );
}