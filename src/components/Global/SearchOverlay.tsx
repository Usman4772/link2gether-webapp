"use client"

import {useState, useEffect, useRef} from "react"
import {Input, Tabs, List, Avatar, Badge, Tag, Spin, Empty, Typography, Space, Button, ConfigProvider} from "antd"
import {
    SearchOutlined,
    CloseOutlined,
    UserOutlined,
    TeamOutlined,
    FileTextOutlined,
    ClockCircleOutlined,
    FireOutlined,
    ArrowRightOutlined,
    CheckCircleOutlined,
} from "@ant-design/icons"
import Loading from "@/components/Global/Loading";
import useSearch from "@/hooks/useSearch";
import Link from "next/link";
import {useRouter} from "next/navigation";

const {Text, Title} = Typography

interface SearchOverlayProps {
    isOpen: boolean
    onClose: () => void
}


const recentSearches = ["React hooks", "CSS animations", "Next.js tutorial", "JavaScript tips", "UI components"]

const trendingTopics = ["#ReactJS", "#WebDev", "#CSS", "#JavaScript", "#NextJS", "#TypeScript", "#AI", "#Design"]

export default ({isOpen, onClose}: SearchOverlayProps) => {
    const [activeTab, setActiveTab] = useState("all")
    const {searchQuery, setSearchQuery, data, isLoading} = useSearch()
    const inputRef = useRef<any>(null)

    // Custom theme for green color scheme
    const theme = {
        token: {
            colorPrimary: "#1a936f",
            colorPrimaryHover: "#22a77f",
            colorPrimaryActive: "#157a5c",
            colorPrimaryBg: "rgba(123, 241, 168, 0.1)",
        },
    }

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
               closeModal()
            }
        }

        if (isOpen) {
            document.addEventListener("keydown", handleKeyDown)
        }

        return () => document.removeEventListener("keydown", handleKeyDown)
    }, [isOpen, onClose])

    // Focus input when overlay opens
    useEffect(() => {
        if (isOpen && inputRef.current) {
            setTimeout(() => {
                inputRef.current?.focus()
            }, 100)
        }
    }, [isOpen])


    if (!isOpen) return null

    const tabItems = [
        {
            key: "all",
            label: "All",
            children: <AllResults results={data} closeModal={closeModal}/>,
        },
        {
            key: "communities",
            label: (
                <Space>
                    <TeamOutlined/>
                    Communities
                </Space>
            ),
            children: <CommunitiesResults communities={data?.communities || []} closeModal={closeModal}/>,
        },
        {
            key: "posts",
            label: (
                <Space>
                    <FileTextOutlined/>
                    Posts
                </Space>
            ),
            children: <PostsResults posts={data?.posts || []} closeModal={closeModal}/>,
        },
        {
            key: "users",
            label: (
                <Space>
                    <UserOutlined/>
                    Users
                </Space>
            ),
            children: <UsersResults users={data?.users || []} closeModal={closeModal}/>,
        },
    ]

    function closeModal(){
        onClose()
        setSearchQuery("")
    }
    return (
        <ConfigProvider theme={theme}>
            <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" style={{backdropFilter: "blur(4px)"}}>
                <div className="flex items-start justify-center min-h-screen pt-16 px-4">
                    <div
                        className="w-full max-w-4xl bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden">
                        {/* Search Header */}
                        <div className="p-6 border-b border-gray-200">
                            <div className="flex items-center gap-4">
                                <Input
                                    ref={inputRef}
                                    size="large"
                                    placeholder="Search communities, posts, users..."
                                    prefix={<SearchOutlined style={{color: "#1a936f"}}/>}
                                    suffix={<Button type="text" icon={<CloseOutlined/>} onClick={closeModal}
                                                    style={{color: "#666"}}/>}
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    style={{
                                        borderRadius: "8px",
                                        border: "2px solid #f0f0f0",
                                    }}
                                    onFocus={(e) => {
                                        e.target.style.borderColor = "#1a936f"
                                        e.target.style.boxShadow = "0 0 0 2px rgba(26, 147, 111, 0.1)"
                                    }}
                                    onBlur={(e) => {
                                        e.target.style.borderColor = "#f0f0f0"
                                        e.target.style.boxShadow = "none"
                                    }}
                                />
                                <Tag color="default"
                                     style={{fontSize: "12px", padding: "4px 12px", borderRadius: "20px"}}>
                                    ESC to close
                                </Tag>
                            </div>
                        </div>

                        {/* Search Content */}
                        <div style={{maxHeight: "500px", overflowY: "auto"}}>
                            {isLoading ? (
                                <div className="flex items-center justify-center py-20">
                                    <Loading/>
                                </div>
                            ) : data ? (
                                <div className="p-6">
                                    <Tabs
                                        activeKey={activeTab}
                                        onChange={setActiveTab}
                                        items={tabItems}
                                        size="large"
                                        tabBarStyle={{marginBottom: "24px"}}
                                    />
                                </div>
                            ) : (
                                <EmptySearchState
                                    recentSearches={recentSearches}
                                    trendingTopics={trendingTopics}
                                    onSearchClick={setSearchQuery}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </ConfigProvider>
    )
}

function AllResults({results,closeModal}: { results: any,closeModal: ()=>void }) {
    if (!results) return null

    return (
        <Space direction="vertical" size="large" style={{width: "100%"}}>
            {/* Communities Section */}
            {results.communities.length > 0 && (
                <div>
                    <Title level={5} style={{marginBottom: "16px", color: "#1a936f"}}>
                        <TeamOutlined style={{marginRight: "8px"}}/>
                        Communities
                    </Title>
                    <CommunitiesResults communities={results.communities.slice(0, 3)} closeModal={closeModal}/>
                </div>
            )}

            {/* Posts Section */}
            {results.posts.length > 0 && (
                <div>
                    <Title level={5} style={{marginBottom: "16px", color: "#1a936f"}}>
                        <FileTextOutlined style={{marginRight: "8px"}}/>
                        Posts
                    </Title>
                    <PostsResults posts={results.posts.slice(0, 3)} closeModal={closeModal}/>
                </div>
            )}

            {/* Users Section */}
            {results.users.length > 0 && (
                <div>
                    <Title level={5} style={{marginBottom: "16px", color: "#1a936f"}}>
                        <UserOutlined style={{marginRight: "8px"}}/>
                        Users
                    </Title>
                    <UsersResults users={results.users.slice(0, 3)} closeModal={closeModal}/>
                </div>
            )}
        </Space>
    )
}

function CommunitiesResults({communities,closeModal}: { communities: any[],closeModal: ()=>void }) {
    const router=useRouter()
    return (
        <List
            dataSource={communities}
            renderItem={(community) => (
                <List.Item
                    className="hover:bg-gray-50 rounded-lg transition-colors cursor-pointer"
                    style={{padding: "12px"}}
                    onClick={()=>{
                         router.push(`/community/${community?._id}`)
                        closeModal()
                    }}
                    actions={[
                       <ArrowRightOutlined key="arrow" style={{color: "#1a936f"}}/>,
                    ]}
                >
                    <List.Item.Meta
                        avatar={
                            <Avatar
                                size={48}
                                src={community.avatar || "/default-avatar.jpeg"}
                                icon={<TeamOutlined/>}
                                style={{border: "2px solid #f0f0f0"}}
                            />
                        }
                        title={
                            <Space>
                                <Text strong style={{fontSize: "16px"}}>
                                    {community?.community_name}
                                </Text>
                            </Space>
                        }
                        description={
                            <Space direction="vertical" size="small">
                                <Text type="secondary">{community?.description}</Text>
                                <Text type="secondary" style={{fontSize: "12px"}}>
                                    {community?.members?.length} members
                                </Text>
                            </Space>
                        }
                    />
                </List.Item>
            )}
        />
    )
}

function PostsResults({posts,closeModal}: { posts: any[],closeModal: ()=>void }) {
    const router=useRouter()
    return (
        <List
            dataSource={posts}
            renderItem={(post) => (
                <List.Item
                    className="hover:bg-gray-50 rounded-lg transition-colors cursor-pointer"
                    style={{padding: "12px"}}
                    onClick={()=>{
                        router.push(`/post/${post?._id}`)
                        closeModal()
                    }}
                    actions={[<ArrowRightOutlined key="arrow" style={{color: "#1a936f"}}/>]}
                >
                    <List.Item.Meta
                        avatar={<FileTextOutlined style={{fontSize: "24px", color: "#1a936f"}}/>}
                        title={
                            <Text strong style={{fontSize: "16px", color: "#1a936f"}}>
                                {post?.description}
                            </Text>
                        }
                    />
                </List.Item>
            )}
        />
    )
}

function UsersResults({users,closeModal}: { users: any[],closeModal: ()=>void }) {
    const router=useRouter()
    return (
        <List
            dataSource={users}
            renderItem={(user) => (
                <List.Item
                    className="hover:bg-gray-50 rounded-lg transition-colors cursor-pointer"
                    style={{padding: "12px"}}
                    onClick={()=>{
                        router.push(`/user/profile/${user?._id}`)
                        closeModal()
                    }}
                    actions={[
                       <ArrowRightOutlined key="arrow" style={{color: "#1a936f"}}/>
                    ]}
                >
                    <List.Item.Meta
                        avatar={
                            <Avatar
                                size={48}
                                src={user?.profileImage || "/default-user.jpeg"}
                                icon={<UserOutlined/>}
                                style={{border: "2px solid #f0f0f0"}}
                            />
                        }
                        title={
                            <Space>
                                <Text strong style={{fontSize: "16px"}}>
                                    {user?.username}
                                </Text>
                            </Space>
                        }
                        description={
                            <Space direction="vertical" size="small">
                                <Text type="secondary">@{user.username}</Text>
                            </Space>
                        }
                    />
                </List.Item>
            )}
        />
    )
}

function EmptySearchState({
                              recentSearches,
                              trendingTopics,
                              onSearchClick,
                          }: {
    recentSearches: string[]
    trendingTopics: string[]
    onSearchClick: (query: string) => void
}) {
    return (
        <div className="p-6">
            <Space direction="vertical" size="large" style={{width: "100%"}}>
                {/* Recent Searches */}
                <div>
                    <Title level={5} style={{marginBottom: "16px", color: "#1a936f"}}>
                        <ClockCircleOutlined style={{marginRight: "8px"}}/>
                        Recent Searches
                    </Title>
                    <List
                        dataSource={recentSearches}
                        renderItem={(search) => (
                            <List.Item
                                className="hover:bg-gray-50 rounded-lg transition-colors cursor-pointer"
                                style={{padding: "8px 12px"}}
                                onClick={() => onSearchClick(search)}
                            >
                                <List.Item.Meta
                                    avatar={<SearchOutlined style={{color: "#1a936f"}}/>}
                                    title={<Text style={{color: "#1a936f"}}>{search}</Text>}
                                />
                            </List.Item>
                        )}
                    />
                </div>

                {/* Trending Topics */}
                <div>
                    <Title level={5} style={{marginBottom: "16px", color: "#1a936f"}}>
                        <FireOutlined style={{marginRight: "8px"}}/>
                        Trending Topics
                    </Title>
                    <Space wrap>
                        {trendingTopics.map((topic, index) => (
                            <Tag
                                key={index}
                                color="default"
                                style={{
                                    cursor: "pointer",
                                    borderColor: "#1a936f",
                                    color: "#1a936f",
                                    fontSize: "14px",
                                    padding: "4px 12px",
                                    borderRadius: "20px",
                                }}
                                onClick={() => onSearchClick(topic)}
                                className="hover:bg-green-50"
                            >
                                {topic}
                            </Tag>
                        ))}
                    </Space>
                </div>

                {/* Empty State */}
                <Empty
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                    description={
                        <Space direction="vertical" align="center">
                            <Text type="secondary" style={{fontSize: "16px"}}>
                                Start typing to search
                            </Text>
                            <Text type="secondary">Find communities, posts, and users across the platform</Text>
                        </Space>
                    }
                />
            </Space>
        </div>
    )
}
