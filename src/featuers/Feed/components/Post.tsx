"use client"
import DotDropdown from "@/components/Global/DotDropdown"
import Paragraph from "@/components/Global/Paragraph"
import PreviewImage from "@/components/Global/PreviewImage"
import ShowMore from "@/components/Global/ShowMore"
import { Ban, Hide, Report, Save } from "@/components/icons/icons"
import BanUserModal from "@/featuers/Community/components/BanUserModal"
import HidePostModal from "@/featuers/Community/components/HidePostModal"
import ReportPostModal from "@/featuers/Community/components/ReportPostModal"
import useHidePost from "@/featuers/Community/hooks/useHidePost"
import ShareModal from "@/featuers/Post/components/ShareModal"
import useLike from "@/featuers/Post/hook/useLike"
import useSavePost from "@/featuers/Post/hook/useSavePost"
import type { PostProps } from "@/utils/backend/modules/auth/types/post.types"
import {convertNumberToK, translate} from "@/utils/frontend/helpers/globals"
import Image from "next/image"
import Link from "next/link"
import React, { useEffect, useState } from "react"
import { RiHeart3Line as Like, RiHeart3Fill as LikeFill } from "react-icons/ri"
import ReactTimeAgo from "react-time-ago"
import { RemoveFromSaved } from "@/components/icons/icons"
import { twMerge } from "tailwind-merge"
import { useAppDispatch } from "@/hooks/useAppSelector"
import { setOpenLoginModal } from "@/redux/Slices/user.slice"
import { censor } from "@/utils/frontend/helpers/globals"
import { Languages, Loader2 } from "lucide-react"
//@ts-ignore
import Video from "next-video"
import toast from "react-hot-toast";

function Post({
                  data,
                  isAdmin = false,
                  isMode = false,
                  communityDetails,
                  isPublicPage = false,
                  className = "",
              }: PostProps) {
    const { optimisticIsLiked, optimisticLikes, like } = useLike(data)
    const [openShareModal, setOpenShareModal] = useState(false)
    const formRef = React.useRef<HTMLFormElement>(null)
    const [openReportPostModal, setOpenReportPostModal] = useState(false)
    const [openBanUserModal, setOpenBanUserModal] = useState(false)
    const { openHidePostModal, setOpenHidePostModal, hidePost, hideBtnLoading } = useHidePost(
        data?.id,
        communityDetails?.id,
    )
    const { savePost } = useSavePost()
    const dispatch = useAppDispatch()

    // Translation state
    const [isTranslating, setIsTranslating] = useState(false)
    const [translatedText, setTranslatedText] = useState("")
    const [showTranslation, setShowTranslation] = useState(false)
    const [targetLanguage, setTargetLanguage] = useState("en")

    const userDropdownItems = [
        {
            key: "save_post",
            label: `${data?.isSaved ? "Remove from saved" : "Save"}`,
            icon: data?.isSaved ? <RemoveFromSaved className="w-4 h-4" /> : <Save className="w-4 h-4" />,
            onClick: () => savePost(data?.id),
        },
        {
            //todo disable this button if the user is the author of the post once implemented userDetails api.
            key: "report_post",
            label: "Report Post",
            icon: <Report className="h-4 w-h4" />,
            danger: true,
            onClick: () => setOpenReportPostModal(true),
        },
    ]

    const adminDropdownItems = [
        {
            key: "save_post",
            label: `${data?.isSaved ? "Remove from saved" : "Save"}`,
            icon: data?.isSaved ? <RemoveFromSaved className="w-4 h-4" /> : <Save className="w-4 h-4" />,
            onClick: () => savePost(data?.id),
        },

        {
            key: "hide_post",
            label: "Hide Post",
            icon: <Hide className="w-4 h-4" />,
            onClick: () => setOpenHidePostModal(true),
        },
        {
            key: "ban_user",
            label: "Ban User",
            disabled: data?.author?.id == communityDetails?.createdBy,
            icon: <Ban className="w-4 h-4" />,
            danger: true,
            onClick: () => setOpenBanUserModal(true),
        },
    ]

    // Translation function
    const translateText = async () => {
        if (!data?.description) return
        setIsTranslating(true)

        try {
            const response = await translate(data?.description)
            if (response) {
                setTranslatedText(response)
                setShowTranslation(true)
            }
        } catch (error) {
            toast.error("Something went wrong while translating the text. Please try again later.")
        } finally {
            setIsTranslating(false)
        }
    }

    useEffect(() => {
        if (!data?.allow_actions && isPublicPage) {
            dispatch(setOpenLoginModal(true))
        }
    }, [])

    return (
        <div
            className={twMerge(
                "flex flex-col gap-4 w-[70%] min-h-max relative overflow-hidden bg-white backdrop-blur-sm rounded-xl border border-gray-100",
                className,
            )}
        >
            {/* Decorative elements */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-100/50 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-purple-100/50 rounded-full blur-3xl"></div>

            <div className="relative z-10 p-5">
                {/* Header */}
                <div className="flex items-center justify-between mb-3">
                    {data?.community ? (
                        <div className="flex items-center gap-3">
                            <div className="relative group">
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full blur-[2px] opacity-20 group-hover:opacity-30 transition-opacity"></div>
                                <Image
                                    src={data?.community?.avatar || "/group-default.png"}
                                    width={48}
                                    height={48}
                                    className="relative rounded-full object-cover w-12 h-12 border-2 border-white"
                                    alt="Avatar"
                                />
                                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-white rounded-full flex items-center justify-center p-[2px] border border-gray-100">
                                    <Image
                                        src={data?.author?.profileImage || "/default-user.jpeg"}
                                        width={20}
                                        height={20}
                                        className="rounded-full w-full h-full object-cover"
                                        alt="Author"
                                    />
                                </div>
                            </div>
                            <div>
                                <div className="flex items-center gap-1">
                                    <Link
                                        href={`/community/${data?.community?.id}`}
                                        className="text-gray-900 text-[16px] font-semibold hover:text-blue-500 transition-colors"
                                    >
                                        {data?.community?.community_name}
                                    </Link>
                                </div>
                                <div className="flex items-center gap-1.5 text-gray-500 text-[13px]">
                                    <div className="hover:text-blue-500 transition-colors">by {data?.author?.username}</div>
                                    <span>•</span>
                                    <ReactTimeAgo date={new Date(data?.created_at)} locale="en-US" className="text-gray-500" />
                                </div>
                            </div>
                        </div>
                    ) : (
                        <UserHeader author={data?.author} created_at={data?.created_at} />
                    )}

                    {isPublicPage && !data?.allow_actions ? null : (
                        <div>
                            <DotDropdown items={isAdmin || isMode ? adminDropdownItems : userDropdownItems} />
                        </div>
                    )}
                </div>

                {/* Content */}
                <div className="mb-4">
                    <div className="relative">
                        <ShowMore
                            text={showTranslation ? translatedText : censor(data?.description) || ""}
                            maxLength={200}
                            className="text-gray-800 leading-relaxed text-[15px]"
                        />

                        {/* Translation Controls */}
                        <div className="flex items-center gap-2 mt-3 pt-2 border-t border-gray-50">
                            {!showTranslation ? (
                                <button
                                    onClick={translateText}
                                    disabled={isTranslating || !data?.description}
                                    className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-600 hover:text-[#1a936f] hover:bg-[#e6f7f1] rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isTranslating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Languages className="w-4 h-4" />}
                                    {isTranslating ? "Translating..." : "Translate"}
                                </button>
                            ) : (
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => setShowTranslation(false)}
                                        className="flex items-center gap-2 px-3 py-1.5 text-sm text-[#1a936f] bg-[#e6f7f1] rounded-lg hover:bg-[#d1f5e4] transition-all duration-200"
                                    >
                                        <Languages className="w-4 h-4" />
                                        Show Original
                                    </button>
                                </div>
                            )}

                        </div>
                    </div>
                </div>

                {/* Media */}
                {data?.type !== "text" && data?.type !== "video" && (
                    <div className="mb-5 overflow-hidden rounded-lg">
                        <PreviewImage
                            image={data?.media || ""}
                            width={500}
                            className="!w-full !h-[400px] object-cover hover:scale-105 transition-transform duration-700 ease-in-out"
                            alt="Post"
                        />
                    </div>
                )}

                {data?.type !== "text" && data?.type !== "image" && (
                    <div className="mb-5 overflow-hidden rounded-lg">
                        <Video src={data?.media} accentColor={"#00b07c"} />
                    </div>
                )}

                {/* Actions */}
                <div className="flex justify-between pt-4 border-t border-gray-100">
                    <form
                        className="group flex items-center gap-2 rounded-full px-4 py-2 transition-all duration-200 hover:bg-blue-50"
                        action={() => {
                            !data?.allow_actions && isPublicPage ? dispatch(setOpenLoginModal(true)) : like()
                        }}
                        ref={formRef}
                    >
            <span onClick={() => formRef.current?.requestSubmit()} className="cursor-pointer flex items-center gap-2">
              {optimisticIsLiked ? (
                  <div className="flex items-center justify-center gap-2">
                      <LikeFill className="text-[22px] text-btn_primary_clr" />
                      <div className="text-blue-500 font-medium text-[14px]">{convertNumberToK(optimisticLikes)}</div>
                  </div>
              ) : (
                  <div className="flex items-center justify-center gap-2">
                      <Like className="text-[22px] text-gray-500 group-hover:text-blue-500 transition-colors" />
                      <div className="text-gray-500 group-hover:text-blue-500 transition-colors text-[14px]">
                          {convertNumberToK(optimisticLikes)}
                      </div>
                  </div>
              )}
            </span>
                    </form>
                    <Link
                        className="group flex items-center gap-2 rounded-full px-4 py-2 transition-all duration-200 hover:bg-blue-50"
                        href={`/post/${data?.id}`}
                    >
                        <img
                            src="/comment.svg"
                            width={20}
                            height={20}
                            className="object-cover opacity-60 group-hover:opacity-100 transition-opacity"
                        />
                        <Paragraph
                            text={`${convertNumberToK(data?.comments)}`}
                            className="text-gray-500 group-hover:text-blue-500 transition-colors text-[14px]"
                        />
                    </Link>
                    <button
                        className="group flex items-center gap-2 rounded-full px-4 py-2 transition-all duration-200 hover:bg-blue-50"
                        onClick={() => setOpenShareModal(true)}
                    >
                        <img
                            src="/share.svg"
                            width={20}
                            height={20}
                            className="opacity-60 group-hover:opacity-100 transition-opacity"
                        />
                        <span className="text-gray-500 group-hover:text-blue-500 transition-colors text-[14px]">Share</span>
                    </button>
                </div>
            </div>

            {/* Modals */}
            <ShareModal openModal={openShareModal} setOpenModal={setOpenShareModal} url={data?.url} />
            <HidePostModal
                openModal={openHidePostModal}
                setOpenModal={setOpenHidePostModal}
                onConfirmAction={hidePost}
                loading={hideBtnLoading}
            />
            <BanUserModal
                openModal={openBanUserModal}
                setOpenModal={setOpenBanUserModal}
                userId={data?.author?.id}
                communityId={communityDetails?.id}
            />
            <ReportPostModal
                openModal={openReportPostModal}
                setOpenModal={setOpenReportPostModal}
                postId={data?.id}
                communityId={communityDetails?.id}
            />
        </div>
    )
}

export default Post

interface UserHeaderProps {
    id: string | number
    username: string
    profileImage: string | null
}

function UserHeader({ author, created_at }: { author: UserHeaderProps; created_at: string }) {
    return (
        <div className="flex items-center gap-3">
            <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full blur-[2px] opacity-20 group-hover:opacity-30 transition-opacity"></div>
                <Image
                    src={author?.profileImage || "/group-default.png"}
                    width={48}
                    height={48}
                    className="relative rounded-full object-cover w-12 h-12 border-2 border-white"
                    alt="Profile Picture"
                />
            </div>
            <div>
                <div className="flex items-center gap-1">
                    <Link
                        href={`/profile/${author?.id}`}
                        className="text-gray-900 text-[16px] font-semibold hover:text-blue-500 transition-colors"
                    >
                        {author?.username}
                    </Link>
                </div>
                <div className="flex items-center gap-1 text-gray-500 text-[13px]">
                    <ReactTimeAgo date={new Date(created_at)} locale="en-US" className="text-gray-500" />
                </div>
            </div>
        </div>
    )
}
