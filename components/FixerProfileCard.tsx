import { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, MapPin, Clock, CheckCircle, Languages, Award, Wrench } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { formatDistanceToNow } from 'date-fns';
import { nl } from 'date-fns/locale';

interface FixerProfileProps {
  profile: any;
  onSelect?: () => void;
  showSelectButton?: boolean;
}

export function FixerProfileCard({ profile, onSelect, showSelectButton = false }: FixerProfileProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  if (!profile) return null;

  const { user, reviews } = profile;

  return (
    <Card className="w-full overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-4">
            <Avatar className="h-12 w-12 border-2 border-primary">
              <AvatarImage src={profile.profileImageUrl || user?.image} alt={user?.name || "Fixer"} />
              <AvatarFallback>{user?.name?.charAt(0) || "F"}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle>{user?.name}</CardTitle>
              <div className="flex items-center mt-1">
                {profile.averageRating ? (
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-4 w-4 ${i < Math.round(profile.averageRating) ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`} 
                      />
                    ))}
                    <span className="ml-1 text-sm">({profile.totalReviews})</span>
                  </div>
                ) : (
                  <span className="text-sm text-muted-foreground">Nog geen beoordelingen</span>
                )}
              </div>
            </div>
          </div>
          <Badge variant="outline" className={user?.isAvailable ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
            {user?.isAvailable ? 'Beschikbaar' : 'Niet beschikbaar'}
          </Badge>
        </div>
        <CardDescription className="flex items-center mt-2">
          <MapPin className="h-4 w-4 mr-1" />
          {user?.postalCode}
        </CardDescription>
      </CardHeader>
      
      <Tabs defaultValue="about">
        <TabsList className="w-full">
          <TabsTrigger value="about" className="flex-1">Over</TabsTrigger>
          <TabsTrigger value="skills" className="flex-1">Vaardigheden</TabsTrigger>
          <TabsTrigger value="reviews" className="flex-1">Reviews</TabsTrigger>
          {profile.galleryImages?.length > 0 && (
            <TabsTrigger value="gallery" className="flex-1">Galerij</TabsTrigger>
          )}
        </TabsList>
        
        <CardContent className="pt-4">
          <TabsContent value="about">
            <div className="space-y-4">
              {profile.bio && (
                <div>
                  <h4 className="text-sm font-semibold mb-1">Bio</h4>
                  <p className="text-sm">{profile.bio}</p>
                </div>
              )}
              
              {profile.experience && (
                <div>
                  <h4 className="text-sm font-semibold mb-1">Ervaring</h4>
                  <p className="text-sm">{profile.experience}</p>
                </div>
              )}
              
              {profile.education && (
                <div>
                  <h4 className="text-sm font-semibold mb-1">Opleiding</h4>
                  <p className="text-sm">{profile.education}</p>
                </div>
              )}
              
              {profile.languages?.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold mb-1 flex items-center">
                    <Languages className="h-4 w-4 mr-1" />
                    Talen
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {profile.languages.map((language: string) => (
                      <Badge key={language} variant="outline" className="bg-blue-50">
                        {language}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              
              {profile.certifications?.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold mb-1 flex items-center">
                    <Award className="h-4 w-4 mr-1" />
                    Certificeringen
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {profile.certifications.map((cert: string) => (
                      <Badge key={cert} variant="outline" className="bg-purple-50">
                        {cert}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              
              <div>
                <h4 className="text-sm font-semibold mb-1">Uurtarief</h4>
                <p className="text-sm font-medium">€{user?.hourlyRate?.toFixed(2)}/uur</p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="skills">
            <div className="space-y-4">
              {user?.skills?.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold mb-1 flex items-center">
                    <Wrench className="h-4 w-4 mr-1" />
                    Vaardigheden
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {user.skills.map((skill: string) => (
                      <Badge key={skill} variant="outline" className="bg-green-50">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              
              {profile.specialties?.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold mb-1 flex items-center">
                    <Star className="h-4 w-4 mr-1" />
                    Specialiteiten
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {profile.specialties.map((specialty: string) => (
                      <Badge key={specialty} variant="outline" className="bg-orange-50">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              
              {profile.toolsOwned?.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold mb-1 flex items-center">
                    <Wrench className="h-4 w-4 mr-1" />
                    Gereedschap
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {profile.toolsOwned.map((tool: string) => (
                      <Badge key={tool} variant="outline" className="bg-gray-50">
                        {tool}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="reviews">
            {reviews?.length > 0 ? (
              <div className="space-y-4">
                {reviews.map((review: any) => (
                  <div key={review.id} className="border rounded-lg p-3">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`h-4 w-4 ${i < review.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`} 
                          />
                        ))}
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {formatDistanceToNow(new Date(review.createdAt), { 
                          addSuffix: true,
                          locale: nl
                        })}
                      </span>
                    </div>
                    {review.comment && <p className="text-sm">{review.comment}</p>}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground">Nog geen reviews</p>
              </div>
            )}
          </TabsContent>
          
          {profile.galleryImages?.length > 0 && (
            <TabsContent value="gallery">
              <div className="grid grid-cols-2 gap-2">
                {profile.galleryImages.map((image: string, index: number) => (
                  <div 
                    key={index} 
                    className="relative aspect-square rounded-md overflow-hidden cursor-pointer"
                    onClick={() => setSelectedImage(image)}
                  >
                    <Image 
                      src={image} 
                      alt={`Gallery image ${index + 1}`} 
                      fill 
                      className="object-cover hover:scale-105 transition-transform duration-200"
                    />
                  </div>
                ))}
              </div>
              
              <Dialog open={!!selectedImage} onOpenChange={(open) => !open && setSelectedImage(null)}>
                <DialogContent className="max-w-3xl p-0 overflow-hidden">
                  {selectedImage && (
                    <div className="relative w-full aspect-video">
                      <Image 
                        src={selectedImage} 
                        alt="Gallery image" 
                        fill 
                        className="object-contain"
                      />
                    </div>
                  )}
                </DialogContent>
              </Dialog>
            </TabsContent>
          )}
        </CardContent>
      </Tabs>
      
      {showSelectButton && (
        <CardFooter className="border-t pt-4">
          <Button 
            onClick={onSelect} 
            className="w-full bg-primary hover:bg-primary/90"
          >
            <CheckCircle className="mr-2 h-4 w-4" />
            Kies deze fixer
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}