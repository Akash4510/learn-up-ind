"use client";

import React, { useState } from "react";
import { Pencil, X } from "lucide-react";
import { KYC_STATUS } from "@prisma/client";

import { UserWithKYC } from "@/types/user";
import { Button } from "@/components/ui/button";
import { KYCForm } from "./forms/kyc-form";
import { AlertMessage } from "@/components/ui/alert-message";
import { Badge } from "@/components/ui/badge";

interface PersonalInfoProps {
  user: UserWithKYC;
}

export const KYC = ({ user }: PersonalInfoProps) => {
  const [isEditMode, setIsEditMode] = useState(false);

  return (
    <div className="space-y-4 border rounded-md p-4">
      {!user.kyc && (
        <AlertMessage
          message="You have not completed your KYC. Please complete your KYC to receive payouts."
          variant="warning"
        />
      )}
      {user.kyc?.status === KYC_STATUS.PENDING && (
        <AlertMessage
          message="Your KYC is pending approval. You will be notified once it is approved."
          variant="info"
        />
      )}
      {user.kyc?.status === KYC_STATUS.REJECTED && (
        <AlertMessage
          message="Your KYC has been rejected. Please update your details to make a request again."
          variant="error"
        />
      )}

      <div className="flex justify-between items-start">
        <div className="space-y-0.5">
          <h3 className="text-2xl font-bold flex flex-col md:flex-row md:items-center gap-1.5 md:gap-4">
            KYC Details{" "}
            {isEditMode && (
              <Badge variant="secondary" className="w-max mb-2 md:mb-0">
                <Pencil className="size-3 mr-1.5" />
                Editing
              </Badge>
            )}
          </h3>
          <p className="text-sm text-red-400">
            Please make sure your KYC and bank details are correct. This will
            affect your payouts.
          </p>
        </div>

        <Button
          onClick={() => setIsEditMode((prev) => !prev)} // Enable edit mode
          variant="outline"
          size="sm"
        >
          {/* Edit Button */}
          {!isEditMode ? (
            <>
              <Pencil className="size-4" />
              <span className="hidden md:flex">Edit</span>
            </>
          ) : (
            <>
              <X className="size-4" />
              <span className="hidden md:flex">Cancel</span>
            </>
          )}
        </Button>
      </div>

      <KYCForm
        initialData={user.kyc}
        isEditMode={isEditMode}
        onCancel={() => setIsEditMode(false)}
      />
    </div>
  );
};
