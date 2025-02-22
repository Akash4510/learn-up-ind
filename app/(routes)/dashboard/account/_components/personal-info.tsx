"use client";

import React, { useState } from "react";
import { Pencil } from "lucide-react";

import { UserWithKYC } from "@/types/user";
import { Button } from "@/components/ui/button";
import { PersonalInfoForm } from "./forms/personal-info-form";
import { Badge } from "@/components/ui/badge";

interface PersonalInfoProps {
  user: UserWithKYC;
}

export const PersonalInfo = ({ user }: PersonalInfoProps) => {
  const [isEditMode, setIsEditMode] = useState(false);

  return (
    <div className="space-y-4 border rounded-md p-4">
      <div className="flex justify-between items-start">
        <div className="space-y-0.5">
          <h3 className="text-2xl font-bold flex flex-col md:flex-row md:items-center gap-1.5 md:gap-4">
            Personal Details{" "}
            {isEditMode && (
              <Badge variant="secondary" className="w-max mb-2 md:mb-0">
                <Pencil className="size-3 mr-1.5" />
                Editing
              </Badge>
            )}
          </h3>
          <p className="text-sm text-muted-foreground">
            Please provide your personal details as per your government ID.
          </p>
        </div>

        {!isEditMode && (
          <Button
            onClick={() => setIsEditMode((prev) => !prev)} // Enable edit mode
            variant="outline"
            size="sm"
          >
            {/* Edit Button */}
            <Pencil className="size-4" />
            <span className="hidden md:flex">Edit</span>
          </Button>
        )}
      </div>

      <PersonalInfoForm
        initialData={user}
        isEditMode={isEditMode}
        onCancel={() => setIsEditMode(false)}
      />
    </div>
  );
};
